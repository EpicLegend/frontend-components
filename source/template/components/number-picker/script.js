/*----------------------------
START COMPONENT picker-number( Cart Plus Minus Button )
------------------------------ */

(function(){
	/*
		- picker-number кол-во элемента с кнопками + и -
		- проверка если nextVal == 0, то result(input.value) = 0
		- создание и вызов события change ( для ModX компонента)
	*/
	const numberPickers = document.querySelectorAll(".picker-number");

	numberPickers.forEach(function(item, index) {
		const buttons = item.querySelectorAll(".picker-number__button");

		// Событие на изменение значений
		// с помощью кнопок
		buttons.forEach(function(el) {
			el.addEventListener("click", function () {
				const target = this.parentNode.querySelector(".picker-number__input");
				const oldValue = target.value;
				let newValue;
				const maxValue = parseInt( target.getAttribute("max") );

				if ( this.classList.contains("picker-number__button_inc") ) {
					
					if ( maxValue ) {
						if (oldValue < maxValue) {
							newValue = parseInt( oldValue ) + 1;
						} else {
							newValue = maxValue;
						}
					} else {
						newValue = parseInt( oldValue ) + 1;
					}

				} 
				else if ( this.classList.contains("picker-number__button_dec") ) {		

					if (oldValue > 0) {
						newValue = parseInt( oldValue ) - 1;
					} else {
						newValue = 0;
					}

				}

				target.value = newValue;

				const event = new Event('change');
				target.dispatchEvent(event);
			});

		});

	});

	// Событие на изменение значений
	// ввода в input(с помощью клавиатуры)
	numberPickers.forEach(function(item){
		
		item.querySelector(".picker-number__input").addEventListener("input", function (e) {

			const minValue = parseInt( this.getAttribute("min") );
			const maxValue = parseInt( this.getAttribute("max") );

			if (maxValue) {

				if ( this.value >= maxValue) {
					this.value = maxValue;
				} else if ( this.value <= minValue) {
					this.value = minValue;
				}

			}

		});

	});

})();


/*----------------------------
END COMPONENT picker-number( Cart Plus Minus Button )
------------------------------ */
