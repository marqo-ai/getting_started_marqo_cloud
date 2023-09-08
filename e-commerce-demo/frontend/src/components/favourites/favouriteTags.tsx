// import { useState, useEffect } from 'react';
// import { Space, Tag } from 'antd';

// import './favouriteTags.css';

// type FavouriteTagsProps = {
//   favourites: string[];
//   onDeleteFavourite: (term: string) => void;
//   onResetFavourites: () => void;
// };

// const FavouriteTags = ({ favourites, onDeleteFavourite, onResetFavourites }: FavouriteTagsProps) => {
//   const [favClassName, setFavClassName] = useState<string>('invisible-favourites');

//   useEffect(() => {
//     if (favourites.length > 0) {
//       setFavClassName('visible-favourites');
//     } else {
//       setFavClassName('invisible-favourites');
//     }
//   }, [favourites]);

//   return (
//     <div className={`favourite-tags ${favClassName}`}>
//       {/* {favourites.length > 0 && <div>Favourites</div>} */}
//       <div className="fav-heading">Favourites</div>
//       <Space wrap>
//         {favourites.map((favourite) => (
//           <Tag key={favourite} closeIcon onClose={() => onDeleteFavourite(favourite)} color="green">
//             {favourite}
//           </Tag>
//         ))}
//       </Space>
//       {/* {favourites.length > 0 && <button onClick={onResetFavourites}>Clear</button>} */}
//       <button onClick={onResetFavourites}>Clear</button>
//     </div>
//   );
// };

// export default FavouriteTags;

import { useState, useEffect } from 'react';
import { List, Button, Modal, Avatar, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './favouriteTags.css';
import { clearFavourites, removeFavourite } from '../../slices/favouritesSlice';
import { RootState } from '../../store/store';

type favItems = {
  item: string;
};

const FavouriteTags = () => {
  const [favClassName, setFavClassName] = useState<string>('invisible-favourites');

  const [favData, setFavData] = useState<favItems[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.terms);

  const handleRemoveFavourite = (term: string) => {
    dispatch(removeFavourite(term));
  };

  const handleClearFavourites = () => {
    dispatch(clearFavourites());
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (favourites.length > 0) {
      setFavClassName('visible-favourites');
    } else {
      setFavClassName('invisible-favourites');
    }
    let tempFavData: favItems[] = [];
    for (let i = 0; i < favourites.length; i++) {
      tempFavData.push({ item: favourites[i] });
    }
    setFavData(tempFavData);
  }, [favourites]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {`Edit Favourites (${favourites.length})`}
      </Button>
      <Modal
        title="Favourites"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button key="back" onClick={handleClearFavourites}>
            Clear All
          </Button>,
          <Button type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        {/* <div className={`favourite-tags ${favClassName}`}> */}
        <div className={`favourite-tags`}>
          {/* <div className="fav-heading">Favourites</div> */}
          <List
            itemLayout="horizontal"
            dataSource={favData}
            renderItem={(item: favItems, index) => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={() => {
                      handleRemoveFavourite(item.item);
                    }}
                  >
                    delete
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image width={40} src={item.item.startsWith('https://') ? item.item : ''} />
                  }
                  title={item.item.startsWith('https://') ? 'Image' : item.item}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default FavouriteTags;
