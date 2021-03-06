import {
  wxRequest,
  request
} from '@/utils/wxRequest';
import { stringify } from 'qs';

let env = "-test" //-dev 或者 -test
const apiMall = 'https://sujiefs.com/'
const host = "https://lingqule.papamk.com"
const apiHost = "https://admin.lingqule.papamk.com"
// const apiMall = 'http://localhost:8080/'
const header = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const querySettings = () => request(`${host}/wp-json/w2w/v1/store/home`, {noauth: true})

/**
 * 获取发现好商品接口
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
const getDiscoverList = (params) => wxRequest(params, apiMall + '/goods/list?cateidOne=1&cateidTwo=0&price=0&sales=2');

//微信的jscode换取sessionKey
const wxJsCode2Session = (params) => request(host + "/wp-json/w2w/v1/customers/login", {...params, method: 'POST'});
const user2session = (params) => wxRequest(params, apiMall + "/api/wechat/user2session?jsoncallback=?");

const getToken = (params) => request(`${host}/wp-json/jwt-auth/v1/token`, {...params, method:'POST'});
const getMe= (params) => request(`${host}/wp-json/w2w/v1/customers/me`, {...params});
const updateMe= (params) => request(`${host}/wp-json/w2w/v1/customers/me`, {...params, method: 'PUT'});

//商品接口---begin
//首页发现商品接口
const hostGoodsList = (params) => wxRequest(params, apiMall + '/api/home/hostGoodsList');
const getHomeDisvocerList = (params) => wxRequest(params, apiMall + '/api/mall/discoverList');

//查询商品列表
const queryProducts = ({query}) => request(`${host}/wp-json/w2w/v1/products`, {query: {...query, status: 'publish'}, noauth: true});

//查询商品详情信息
// const goodsDetail = (id, params) => request(`${host}/wp-json/wc/v3/products/${id}`, params);
const getProducts = (id, params) => request(`${host}/wp-json/w2w/v1/products/${id}`, params);
//查看商品的Qrcode
const getQrcode = (id, params) => request(`${host}/wp-json/w2w/v1/products/qrcode?id=${id}&transparent=1`, params);

const getQrcodeByPath = (code, params) => request(`${host}/wp-json/w2w/v1/products/qrcode?code=${code}&transparent=1`, params);

//商品加入购物车
const addCart = (params) => request(`${host}/wp-json/w2w/v1/cart/add`, {...params, method: 'POST'});

//用户的购物车商品列表
const getCart = (params) => request(`${host}/wp-json/w2w/v1/cart`, params);

//购物车的商品选中状态
const cartCheck = (params) => request(`${host}/wp-json/w2w/v1/cart/check`, {...params, method: 'POST'}); // wxRequest(params, apiMall + '/api/mall/goodsCart/check');
//购物车的商品删除
const cartDel = (params) => request(`${host}/wp-json/w2w/v1/cart/delete`, {...params, method: 'POST'});

// 获取自己的优惠券
const getCoupons = (params) => request(`${host}/wp-json/w2w/v1/customers/coupons?${stringify(params)}`);
// 领取优惠券
const takeCoupons = (params) => request(`${host}/wp-json/w2w/v1/customers/coupons`, {...params, method: 'PUT'});
//订单中的优惠券添加
const addCoupons = (params) => request(`${host}/wp-json/w2w/v1/cart/coupon`, {...params, method: 'POST'});
//订单中的优惠券删除
const delCoupons = (params) => request(`${host}/wp-json/w2w/v1/cart/coupon`, {...params, method: 'DELETE'});
//订单货运方式设置
const updateCartShipping = (params) => request(`${host}/wp-json/w2w/v1/cart/shipping`, {...params, method: 'POST'});
//购物车的商品数量更新
const cartUpdateNum = (params) => request(`${host}/wp-json/w2w/v1/cart/update_quantity`, {...params, method: 'POST'});

// 订单状态汇总
const getOrderStatics = (params) => request(`${host}/wp-json/w2w/v1/customers/orderinfo`, params);

//支付前生成订单
const saveByCart = ({query}) => request(`${host}/wp-json/w2w/v1/orders`, {query, method: 'POST', header: {'content-type': 'application/x-www-form-urlencoded'}});

//支付统一下单
const toPay = (params) => request(`${host}/wp-json/w2w/v1/payment`, params);

//商品收藏
const goodsFavorite = (params) => wxRequest(params, apiMall + '/api/mall/goodsFavorite/add');

//商品收藏删除
const goodsUnFavorite = (params) => wxRequest(params, apiMall + '/api/mall/goodsFavorite/delete');

//商品是否已收藏
const goodsIsFavorite = (params) => wxRequest(params, apiMall + '/api/mall/goodsFavorite/goodsIsFavorite');

//商品接口---end

//用户相关信息--begin
//用户的当天签到信息
const userSginInfo = (params) => wxRequest(params, apiMall + '/api/userSign/signInfo');
const doSign = (params) => wxRequest(params, apiMall + '/api/userSign/doSign');
//获取最近七天签到情况
const getSignDate = (params) => wxRequest(params, apiMall + '/api/userSign/getSignDate');

//用户积分信息
const pointInfo = (params) => wxRequest(params, apiMall + '/api/userPoint/pointInfo');

//用户足迹信息
const browseInfo = (params) => wxRequest(params, apiMall + '/api/userBrowse/browseInfo');
//添加用户足迹
const addBrowser = (params) => wxRequest(params, apiMall + '/api/userBrowse/add');
//添加用户足迹
const delUserBrowser = (params) => wxRequest(params, apiMall + '/api/userBrowse/delete');

//用户收藏的商品
const favoriteInfo = (params) => wxRequest(params, apiMall + '/api/goodsFavorite/favoriteInfo');

//用户消息
const messageInfo = (params) => wxRequest(params, apiMall + '/api/systemMessage/messageInfo');

//用户手机绑定
const registerUser = (params) => wxRequest(params, apiMall + '/api/userCenter/register');
//发送短信
const sendRandCode = (params) => wxRequest(params, apiMall + '/api/sms/send');

//用户是否绑定手机号
const getUserInfo = (id) => request(`${host}/wp-json/wc/v3/customers/${id}`);

//用户收货地址
const getUserAddress = (params) => wxRequest(params, apiMall + '/api/receiverInfo/list');

//保存用户收货地址
const saveAddress = (params) => wxRequest(params, apiMall + '/api/receiverInfo/saveOrUpdate');

//用户收货地址根据id查询
const receiverInfoById = (params) => wxRequest(params, apiMall + '/api/receiverInfo/receiverInfoById');

//根据Id删除收货地址
const delUserAddress = (params) => wxRequest(params, apiMall + '/api/receiverInfo/operation');

//查询关键字保存
const addSearchKeyword = (params) => wxRequest(params, apiMall + '/api/searchkeyword/add');
//查询关键字列表
const searchKeywordList = (params) => wxRequest(params, apiMall + '/api/searchkeyword/list');
//查询关键字清除
const clearSearchKeyword = (params) => wxRequest(params, apiMall + '/api/searchkeyword/clear');

//查询我的订单
// const getMyOrderList = (params) => wxRequest(params, apiMall + '/api/mall/goodsOrder/getMyOrderList');
const queryOrders = async (params) => {
  let response = await request(`${host}/wp-json/w2w/v1/orders`, params);
  return response;
}

const updateOrders = (id, params) => request(`${host}/wp-json/wc/v3/orders/${id}`, {...params, method: 'PUT'})

//查询我的订单数量
const getMyOrderSize = (params) => wxRequest(params, apiMall + '/api/mall/goodsOrder/getMyOrderSize');

//根据订单号查询详情
const getOrderInfo = (params) => wxRequest(params, apiMall + '/api/mall/goodsOrder/getOrderDetail');

//根据订单号查询详情
const getOrders = (id, params) => request(`${host}/wp-json/w2w/v1/orders/${id}`, params);

//根据订单号查询详情
const editOrderInfo = (params) => wxRequest(params, apiMall + '/api/mall/goodsOrder/opt');

//根据订单号查询物流
const orderExpressInfo = (params) => wxRequest(params, apiMall + '/api/orderExpress/orderExpressInfo');

//查询用户的已订购产品
const goodsUserOrderList = (params) => wxRequest(params, apiMall + '/api/mall/goodsOrder/goodsUserOrderList');

//退货操作
const refundApply = (params) => wxRequest(params, apiMall + '/api/mall/refund/saveRefundApply');

//用户相关信息--end

//商品分类--begin
//一级分类
const rootCtegoryList = (params) => request(`${host}/wp-json/w2w/v1/products/categories?parent=0&per_page=100`, {...params, noauth: true});
//二级三级分类
const queryCategories = ({query = {} }) => request(`${host}/wp-json/w2w/v1/products/categories?per_page=100&${stringify(query)}`, {noauth: true});
//商品分类--end

//查询广告列表
const getBanners = (params) => request(`${host}/wp-json/w2w/v1/store/banner`, {...params, noauth: true});

//获取城市
const queryCities = (params) => request(`${host}/wp-json/wp/v2/cities?per_page=100`, {...params, noauth: true});


//获取小区
const queryEstates = ({query = {}}) => request(`${host}/wp-json/wp/v2/estates`, {query: {...query, status: 'publish', per_page: 100}, noauth: true});
const queryPages =  (params) => request(`${host}/wp-json/wp/v2/pages`, params)

// 获取推广订单
const queryPromotions = ({query}) => request(`${host}/wp-json/w2w/v1/customers/promotions?${stringify(query)}`)


// 创建裂变分享
const createShare = (query) => request(`${apiHost}/api/shares`, {query, noauth: true, method: 'POST', header} )
const getShare = (code, query) => request(`${apiHost}/api/shares/${code}`, {query, noauth: true, header})

export default {
  querySettings,
  hostGoodsList,
  getDiscoverList,
  getHomeDisvocerList,
  queryProducts,
  getProducts,
  getQrcode,
  getQrcodeByPath,
  getToken,
  getMe,
  updateMe,
  wxJsCode2Session,
  user2session,
  userSginInfo,
  doSign,
  addCart,
  getCart,
  cartCheck,
  cartDel,
  cartUpdateNum,
  refundApply,
  pointInfo,
  browseInfo,
  addBrowser,
  delUserBrowser,
  favoriteInfo,
  messageInfo,
  registerUser,
  sendRandCode,
  getUserInfo,
  getUserAddress,
  saveAddress,
  receiverInfoById,
  getUserAddress,
  addSearchKeyword,
  searchKeywordList,
  clearSearchKeyword,
  queryOrders,
  updateOrders,
  saveByCart,
  toPay,
  rootCtegoryList,
  queryCategories,
  getOrderInfo,
  editOrderInfo,
  goodsUserOrderList,
  orderExpressInfo,
  delUserAddress,
  goodsFavorite,
  goodsUnFavorite,
  goodsIsFavorite,
  getMyOrderSize,
  getOrders,
  getBanners,
  getSignDate,
  queryCities,
  queryEstates,
  queryPages,
  getCoupons,
  takeCoupons,
  addCoupons,
  delCoupons,
  getOrderStatics,
  updateCartShipping,
  queryPromotions,
  createShare,
  getShare
}
