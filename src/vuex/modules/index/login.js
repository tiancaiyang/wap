// 登录页面保存数据
var userdata = JSON.parse(localStorage.getItem('userdata') || '[]');
const Login = {
    state :{
        userdata : userdata
    },
    mutations:{
        setStorage(state,userInfo){
            state.userdata = userInfo;  
            // console.log(state.userdata)
            // 当更新 userdata 之后，把 userdata 数组，存储到本地的 localStorage 中
            // localStorage.setItem('userdata', JSON.stringify(state.userdata))
        },
    },
    getters:{
        getb2buserData(state){
            var  b2buserData = state.userdata
            return b2buserData
        }
    }
}
export default Login