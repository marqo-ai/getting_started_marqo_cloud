import { Provider } from 'react-redux';
import { ConfigProvider, Space } from 'antd';
import ResultsDisplay from './components/results/resultsDisplay';
import SearchBar from './components/search/searchBar';
import './App.css';
import store from './store/store';
import SearchSettingsModal from './components/searchSettings/searchSettingsModal';
import FavouriteTags from './components/favourites/favouriteTags';
import Logo from './components/logo/logo';
import CustomInstructionModal from './components/customInstructions/customInstructionsModal';
function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#020659',
            colorTextLightSolid: '#fff',
            borderRadius: 2,
            colorBgContainer: '#fff',
          },
        }}
      >
        <div className="App">
          <header className="App-header">
            <Logo />
            <div className="search-settings">
              <Space size={'large'}>
                <CustomInstructionModal />
                <SearchSettingsModal />
                <FavouriteTags />
              </Space>
            </div>
            <SearchBar enableMoreOf={true} enableLessOf={true}/>
            <ResultsDisplay />
          </header>
        </div>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
