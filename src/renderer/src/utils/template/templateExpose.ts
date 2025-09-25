import axios from 'axios';
import CryptoJS from 'crypto-js';
import * as cheerio from 'cheerio';


function createImmutableProxy(target) {
  return new Proxy(target, {
    // 读取属性时，自动代理嵌套对象
    get(obj, prop, receiver) {
      const value = Reflect.get(obj, prop, receiver);
      // 对象继续封装成 Proxy，保证深度不可修改
      if (typeof value === 'object' && value !== null) {
        return createImmutableProxy(value);
      }
      return value;
    },

    // 禁止写入属性
    set(obj, prop, value) {
      throw new Error(`Cannot modify property "${String(prop)}"`);
    },

    // 禁止新增或更改属性描述符
    defineProperty(obj, prop, descriptor) {
      throw new Error(`Cannot define property "${String(prop)}"`);
    },

    // 禁止删除属性
    deleteProperty(obj, prop) {
      throw new Error(`Cannot delete property "${String(prop)}"`);
    },

    // 禁止扩展对象
    preventExtensions(obj) {
      throw new Error(`Cannot prevent extensions`);
    },

    // 禁止修改原型
    setPrototypeOf(obj, proto) {
      throw new Error(`Cannot change prototype`);
    }
  });
}

// 数据请求
const axiosIns = axios.create({
    timeout: 60 * 1000,
})
const axiosProxy = createImmutableProxy(axiosIns);
export const httpFetch = axiosProxy.request;


// 加密
export const crypt = createImmutableProxy(CryptoJS);


// html 解析
export const cheerioProxy = createImmutableProxy(cheerio);

