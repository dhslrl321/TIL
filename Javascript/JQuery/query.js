submit = () => {
	
	var answers = [];
	
	var $result = $("#result");

	var $n1 = $("#n1");
	
	$result.html("asdf");
		
	$.ajax(
		'https://swmaestro-api.goorm.io/submit',
		{
			method: 'post',
			data: JSON.stringify(),
			success: function(data) {
				
				/*if(data) result.innerHTML = "정답입니다.";
				else result.innerHTML = "오답입니다.";*/
			}
		},
	);
};


jquersy_function = () => {

    var $var_name = $("#id_name"); // id 이름 jquery로 불러오기 == getElementById();

    $var_name.html("변경할 문자열"); // html에 쓰기 == innerHTML();

}

/*
    제이쿼리 테이블 : https://zetawiki.com/wiki/JQuery_%ED%85%8C%EC%9D%B4%EB%B8%94_%ED%96%89_%EC%B6%94%EA%B0%80/%EC%82%AD%EC%A0%9C
*/