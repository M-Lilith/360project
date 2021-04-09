function Product(){
    //实例属性
    this.cart_btn = document.querySelector('#buy');
    //购买按钮
    this.buy = document.querySelectorAll('.addToCart');
    //初始化方法（购物车中的数量)
    this.init();
    //添加事件
    this.addEvent();
}
Product.prototype = {
    constructor : Product,
    addEvent(){
        let that = this;
        this.cart_btn.onclick = function(){
            location.href = 'cart.html';
        }
        for(let i = 0,len = this.buy.length;i < len;i ++){
            this.buy[i].onclick = function(){
                //商品ID
                let good_id = this.parentNode.getAttribute('data-good-id');
                //商品缩略图
                let good_src = this.parentNode.children[0].src;
                //商品名称
                let good_name = this.previousElementSibling.previousElementSibling.innerText;
                //商品价格
                let good_price = parseInt(this.previousElementSibling.innerText);
                //判断本地存储中（购物车中）是否购买过当前商品
                /*
                    key : carts
                    value:
                    '{
                        "sp1" : {
                            "name" : "香蕉",
                            "price" : 30,
                            "src" : "...",
                            "num" : 3
                        }
                    }'
                */
               //获取本地存储中的数据
               let storage = window.localStorage;
               let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                //转对象
                let storage_obj = that.convertStrToObj(storage_str);
                //判断当前商品是否存在
                if(good_id in storage_obj){
                    //如果在，找到当前商品的数量+ 1
                    storage_obj[good_id].num ++;
                }else{
                    //如果不存在
                    storage_obj[good_id] = {
                        "name" : good_name,
                        "price" : good_price,
                        "src" : good_src,
                        "num" : 1
                    }
                }
                //创建storage
                storage.setItem('carts',JSON.stringify(storage_obj));

                //改变购物车按钮中的数量
                let num = /(\d+)/.exec(that.cart_btn.value)[1];
                // alert(num);
                that.cart_btn.value = `购物车(${++ num})`;
            }
        }
    },
    init(){
        //获取本地存储中的数据
        let storage = window.localStorage;
        let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
         //转对象
         let storage_obj = this.convertStrToObj(storage_str);
         let sum = 0;
         //遍历对象
         for(let key in storage_obj){
             sum += storage_obj[key].num;
         }
         this.cart_btn.value = `购物车(${sum})`;
    },
    convertStrToObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
}

new Product();