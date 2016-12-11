$(function(){
	$("#btn").on("click",function(){
		let userName = $("#userName").val();
		let passWord = $("#passWord").val();
		let repassWord = $("#repassWord").val();
		if(!userName){
			alert('请填写用户名');
			return;
		}
		if(!passWord){
			alert('请填写密码');
			return;
		}
		if(!repassWord){
			alert('请填确认密码');
			return;
		}
		if(passWord !== repassWord){
			alert('两次输入的密码不一样');
			return;
		}
		$.ajax({
			url :'/api/user/register',
			type :'post',
			dataType:'json',
			data:{
				username : userName,
				password : passWord,
				repassword : repassWord
			},
			success:function(data){
				if(data){
					alert(data.message);
				}
			}
		});
	});
});