/*
 * @Author: wangyongqi@baidu.com 
 * @Date: 2020-12-15 17:18:59 
 * @Last Modified by: wangyongqi@baidu.com
 * @Last Modified time: 2020-12-15 18:19:39
 */

function addCopyright(content, map, meta) {
    return `/* @1999-2020 Apple. All rights reserved*/\n${content}`;
}

module.exports = addCopyright;
