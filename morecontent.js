checkWeather('tokyo');

slider.addEventListener('change',function(){
        if(this.checked){
            console.log('check');
            var x=document.querySelector('.temp').textContent;
            const celsiusValue = parseFloat(x);
            if (!isNaN(celsiusValue)) {
                const fahrenheitValue = Math.floor((celsiusValue * 9/5) + 32);
                document.querySelector('.temp').innerHTML=fahrenheitValue+'°F'
            }
        }
        else{
            console.log('uncheck');
            var x=document.querySelector('.temp').textContent;
            const celsiusValue = parseFloat(x);
            if (!isNaN(celsiusValue)) {
                const fahrenheitValue = Math.floor((celsiusValue-32) * 5/9);
                document.querySelector('.temp').innerHTML=fahrenheitValue+'°C'

        }
    }})

    document.addEventListener('keypress',function(e){
        if(e.key=="Enter"){
            checkWeather(searchBox.value);
        }
    })
    searchBtn.addEventListener("click",()=>{
        checkWeather(searchBox.value);
    })