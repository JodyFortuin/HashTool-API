module.exports = function HashToolService(pool) {

    async function getPosts(response) {
        for(var i = 0; i < response.data.data.items.length; i++){
            addPostToDatabase(response.data.data.items[i]);
            addUserToDatabase(response.data.data.items[i]);
        }

        //displaying results from api as database is not deployed
        return response;
    }

    async function addPostToDatabase(post) {
        const postValue = await pool.query("select * from posts where post=$1",[post.image_versions[0].url]);
    
        if(postValue.rowCount === 0){
            const INSERT_POST = await pool.query("insert into posts(post, likes, comments) values($1, $2, $3)", [post.image_versions[0].url, post.like_count, post.comment_count]); 
        return true
        } else return false;
    }

    async function addUserToDatabase(user) {
        const userValue = await pool.query("select * from users where username=$1",[user.user.username]);
    
        if(userValue.rowCount === 0){
            const INSERT_USER = await pool.query("insert into users(username) values($1)", [user.user.username]); 
        return true
        } else return false;
    }
      
    return{
        getPosts
    }
}
