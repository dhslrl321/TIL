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

    $("#chkbox_id").is(":checked") ;    //- id가 동일한 체크박스에 대하여 선택되어 있는지 확인 : true / false 반환

}

/*
    제이쿼리 테이블 : https://zetawiki.com/wiki/JQuery_%ED%85%8C%EC%9D%B4%EB%B8%94_%ED%96%89_%EC%B6%94%EA%B0%80/%EC%82%AD%EC%A0%9C
*/

/*
    체크박스 제어하기 : https://fruitdev.tistory.com/143 
*/


/*
	제이쿼리 메서드 : https://turfrain.tistory.com/entry/1-jQuery-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%A0%95%EB%A6%AC
	제이쿼리 메서드 2 : https://www.biew.co.kr/37?category=314311
*/