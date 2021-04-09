function Cart(){
    //实例属性
    //获取购物车列表
    this.list = document.querySelector('.cartList');
    //获取数据，完善页面
    this.init();
}
//原型方法
Cart.prototype = {
    constructor : Cart,
    init(){
        let that = this;
        let storage = window.localStorage;
        //获取数据
        let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
        //转成对象
        let storage_obj = this.convertStrToObj(storage_str);
        //遍历对象，取出每一个商品信息
        for(let key in storage_obj){
            //取出商品信息
            let good = storage_obj[key];
            //完善页面
            //创建ul
            let ul = document.createElement('ul');
            ul.className = 'goodInfo';
            ul.setAttribute('data-good-id',key);
            ul.innerHTML = 
            `
                <li><img src="${good.src}" /></li>
				<li>${good.name}</li>
				<li>${good.price}</li>
				<li class="num">
					<a href="javascript:;" class="minus">-</a>
					<input type="text" name="" id="" value="${good.num}" />
					<a href="javascript:;" class="plus">+</a>
				</li>
				<li class="total">${good.price * good.num}</li>
				<li><a href="javascript:;" class="del">删除</a></li>
            `
            this.list.appendChild(ul);
        }
        //获取所有的 -
        let o_minus = document.querySelectorAll('.minus');
        //遍历=添加事件
        for(let i = 0,len = o_minus.length;i < len;i ++){
            o_minus[i].onclick = function(){
                //获取商品Id
                let good_id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                let storage_obj = that.convertStrToObj(storage_str);
                // > 1 -
                if(storage_obj[good_id].num > 1){
                    storage_obj[good_id].num --;
                }
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.nextElementSibling.value = storage_obj[good_id].num;
                this.parentNode.nextElementSibling.innerText = storage_obj[good_id].price * storage_obj[good_id].num;
            }
        }
        //获取所有的 +
        let plus = document.querySelectorAll('.plus');
        //遍历-添加事件
        for(let i = 0,len = plus.length;i < len;i ++){
            plus[i].onclick = function(){
                //获取id
                let id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                let storage_obj = that.convertStrToObj(storage_str);
                //数量递增
                storage_obj[id].num ++;
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.previousElementSibling.value = storage_obj[id].num;
                this.parentNode.nextElementSibling.innerText = storage_obj[id].price * storage_obj[id].num;
            }
        }
        //获取所有的数量框
        let o_inp = document.querySelectorAll('.num input');
        //遍历-添加事件
        for(let i = 0,len = o_inp.length;i < len;i ++){
            o_inp[i].onblur = function(){
                //获取id
                let id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                let storage_obj = that.convertStrToObj(storage_str);
                let str = this.value; //当前文本框中的值
                if(/^\d+$/.test(str)){
                    storage_obj[id].num = str;
                }else{
                    storage_obj[id].num = 1;
                }
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.value = storage_obj[id].num;
                this.parentNode.nextElementSibling.innerText = storage_obj[id].price * storage_obj[id].num;
            }
        }
        //获取所有的删除按钮
        let del = document.querySelectorAll('.del');
        //遍历-添加事件
        for(let i = 0,len = del.length;i < len;i ++){
            del[i].onclick = function(){
                //获取id
                let id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                //转对象
                let storage_obj = that.convertStrToObj(storage_str);
                //删除对象中的属性
                delete storage_obj[id];
                //存入本地存储
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.parentNode.parentNode.remove();
            }
        }
    },
    convertStrToObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
}

new Cart();