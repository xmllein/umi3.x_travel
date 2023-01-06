// 搜索页面mock
export default {
  // 搜索结果
  'POST /api/house/search': (req, res) => {
    // 设置延迟
    setTimeout(() => {
      let data;
      if (req.body.pageNum < 4) {
        data = [
          {
            id: 1,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '东城民宿',
            info: '东城区交通方便',
            price: '100',
          },
          {
            id: 2,
            img: 'https://www.itying.com/images/flutter/slide02.jpg',
            title: '西城民宿',
            info: '西城区山水怡情',
            price: '120',
          },
          {
            id: 3,
            img: 'https://www.itying.com/images/flutter/slide03.jpg',
            title: '新区民宿',
            info: '新区民宿位置优越',
            price: '200',
          },
          {
            id: 4,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '老城民宿',
            info: '老城区风景秀美',
            price: '220',
          },
          {
            id: 5,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '东城民宿',
            info: '东城区交通方便',
            price: '100',
          },
          {
            id: 6,
            img: 'https://www.itying.com/images/flutter/slide02.jpg',
            title: '西城民宿',
            info: '西城区山水怡情',
            price: '120',
          },
          {
            id: 7,
            img: 'https://www.itying.com/images/flutter/slide03.jpg',
            title: '新区民宿',
            info: '新区民宿位置优越',
            price: '200',
          },
          {
            id: 8,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '老城民宿',
            info: '老城区风景秀美',
            price: '220',
          },
        ];
      } else {
        data = [];
      }
      res.json({
        status: 200,
        errMsg: '',
        data,
      });
    }, 1000);
  },
  // 房屋详情
  'POST /api/house/detail': (req, res) => {
    setTimeout(() => {
      res.json({
        status: 200,
        errMsg: '',
        data: {
          id: 1,
          info: {
            msg: '东城区交通方便',
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '东城民宿',
            price: '100',
            publishTime: 1595238771000,
            startTime: 1595238771000,
            endTime: 1595238771000,
          },
          banner: [
            'https://www.itying.com/images/flutter/slide01.jpg',
            'https://www.itying.com/images/flutter/slide02.jpg',
            'https://www.itying.com/images/flutter/slide03.jpg',
          ],
        },
      });
    }, 1000);
  },
  // 房屋评论
  'POST /api/comments/lists': (req, res) => {
    setTimeout(() => {
      let data;
      if (req.body.pageNum < 4) {
        data = [
          {
            id: 1,
            avatar:
              'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
            username: 'user',
            createTime: 1595238771000,
            info: '房屋很满意',
          },
          {
            id: 2,
            avatar: '',
            username: 'user',
            createTime: 1595238771000,
            info: '空气清新',
          },
          {
            id: 3,
            avatar:
              'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
            username: 'user',
            createTime: 1595238771000,
            info: '态度温和',
          },
          {
            id: 4,
            avatar:
              'http://img1.mukewang.com/szimg/5a1f65a900015d1505400300-360-202.jpg',
            username: 'user',
            createTime: 1595238771000,
            info: '早餐味道美',
          },
          {
            id: 5,
            avatar:
              'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
            username: 'user',
            createTime: 1595238771000,
            info: '态度温和',
          },
          {
            id: 6,
            avatar:
              'http://img1.mukewang.com/szimg/5a1f65a900015d1505400300-360-202.jpg',
            username: 'user',
            createTime: 1595238771000,
            info: '早餐味道美',
          },
          {
            id: 7,
            avatar:
              'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
            username: 'user',
            createTime: 1595238771000,
            info: '态度温和',
          },
          {
            id: 8,
            avatar:
              'http://img1.mukewang.com/szimg/5a1f65a900015d1505400300-360-202.jpg',
            username: 'user',
            createTime: 1595238771000,
            info: '早餐味道美',
          },
        ];
      } else {
        data = [];
      }
      res.json({
        status: 200,
        data,
      });
    }, 100);
  },

  // 添加评论
  'POST /api/comments/add': (req, res) => {
    setTimeout(() => {
      res.json({
        status: 200,
        errMsg: '',
        data: '评论成功',
      });
    }, 100);
  },
};
