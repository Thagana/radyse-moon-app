import * as React from 'react';
import {View, SafeAreaView, RefreshControl, FlatList} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Article from '../../components/Articles/Article';
import {getAllNews, headLineNews} from '../../functions/newsController';
import styles from './Home.style';
import HeaderList from '../../components/HeaderList/HeaderList';

import LoadingArticle from '../../components/Articles/LoadingArticle';
import ErrorArticle from '../../components/Articles/ErrorArticle';
import EmptyList from '../../components/EmptyList';
import ListFooter from '../../components/ListFooter';

import UniqueNameSet from '../../utils/UniqueNameSet';
import NotConnected from '../../components/NotConnected';
import {showMessage} from 'react-native-flash-message';

type Props = {
  navigation: {
    navigate(param: string): void;
  };
};

type SERVER_STATES = 'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS';

const Home = (props: Props) => {
  const {navigation} = props;
  const [term, setTerm] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [articles, setArticle] = React.useState<any>([]);
  const [connected, setConnected] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [pageEnd, setPageEnd] = React.useState(false);
  const [headlines, setHeadlines] = React.useState<any[]>([]);

  // SERVER STATES
  const [SERVER_STATE, setServerState] = React.useState<SERVER_STATES>('IDLE');

  const mounted = React.useRef(true);

  const fetchNews = React.useCallback(async () => {
    try {
      if (connected) {
        const {success, data} = await getAllNews(page, 10);
        if (mounted.current) {
          if (success) {
            if (data.length === 0) {
              setPageEnd(true);
            } else {
              setArticle((prev: any) =>
                Array.from(new UniqueNameSet([...prev, ...data]).values()),
              );
            }
            setServerState('SUCCESS');
          } else {
            setServerState('ERROR');
          }
        }
      }
    } catch (error) {
      setServerState('ERROR');
      console.log(error);
    }
  }, [connected, page]);

  const fetchHeadLines = React.useCallback(async () => {
    try {
      if (connected) {
        const {success, data} = await headLineNews();
        if (mounted.current) {
          if (success) {
            if (data.length === 0) {
              setPageEnd(true);
            } else {
              setHeadlines((prev: any) =>
                Array.from(new UniqueNameSet([...prev, ...data]).values()),
              );
            }
            setServerState('SUCCESS');
          } else {
            setServerState('ERROR');
          }
        }
      }
    } catch (error) {
      setServerState('ERROR');
      console.log(error);
      showMessage({
        message: 'Something went wrong please try again later',
        type: 'danger',
      });
    }
  }, [connected]);

  const fetchMoreData = () => {
    if (!pageEnd && !refreshing) {
      setPage(page + 1);
    }
  };

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      setServerState('LOADING');
      if (connected) {
        const {success, data} = await getAllNews(page, 10);
        if (success) {
          setArticle((prev: any) =>
            Array.from(new UniqueNameSet([...prev, ...data]).values()),
          );
          setRefreshing(false);
          setServerState('SUCCESS');
        } else {
          setRefreshing(false);
          setServerState('ERROR');
        }
      }
    } catch (error) {
      console.log(error);
      setRefreshing(false);
      setServerState('ERROR');
    }
  }, [connected, page]);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (mounted.current) {
        if (state.isConnected) {
          setConnected(true);
        } else {
          setConnected(false);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [connected]);

  React.useEffect(() => {
    fetchNews();
  }, [fetchNews, page]);

  React.useEffect(() => {
    fetchHeadLines();
  }, [fetchHeadLines]);

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  if (!connected) {
    return <NotConnected />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {SERVER_STATE === 'SUCCESS' && (
        <View style={styles.listContainer}>
          <FlatList
            data={articles}
            ListHeaderComponent={
              <HeaderList
                navigation={props.navigation}
                term={term}
                latest={headlines}
                setTerm={setTerm}
              />
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={<ListFooter />}
            ListEmptyComponent={EmptyList}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
            renderItem={({item}) => (
              <Article item={item} isDownload={false} navigation={navigation} />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          <View />
        </View>
      )}
      {SERVER_STATE === 'LOADING' && <LoadingArticle />}
      {SERVER_STATE === 'ERROR' && <ErrorArticle handleReload={onRefresh} />}
    </SafeAreaView>
  );
};

export default Home;
