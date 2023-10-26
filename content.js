const apiKey = "68451ea17fe3465a9146a23922a4daab";
            const apiUrl= "https://api.openweathermap.org/data/2.5/weather?&q=";
            
            const searchBox=document.querySelector(".search input");
            const searchBtn=document.querySelector(".search button");
            const weatherIcon=document.querySelector(".weather-icon");
            const slider = document.querySelector(".slider");

            checkWeather('tokyo');

            slider.addEventListener('change',function(){
                if(this.checked){
                    var x=document.querySelector('.temp').textContent;
                    const celsiusValue = parseFloat(x);
                    if (!isNaN(celsiusValue)) {
                        const fahrenheitValue = Math.round((celsiusValue * 9/5) + 32);
                        document.querySelector('.temp').innerHTML=fahrenheitValue+'°F'
                    }
                }
                else{
                    var x=document.querySelector('.temp').textContent;
                    const celsiusValue = parseFloat(x);
                    if (!isNaN(celsiusValue)) {
                        const fahrenheitValue = Math.round((celsiusValue-32) * 5/9);
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

            
            
            
            
            
            
            async function checkWeather(city){
                if(city==''){
                    document.querySelector(".undefined").style.display="block";
                }
                
                else{
                    var response;
                if(slider.checked){
                    response= await fetch(apiUrl+city+`&appid=${apiKey}`+'&units=imperial');
                }
                else{
                    response= await fetch(apiUrl+city+`&appid=${apiKey}`+'&units=metric');
                }
                

                if(response.status==404){
                    document.querySelector(".undefined").style.display="none";
                    document.querySelector(".error").style.display="block";
                }

                else {
                var data=await response.json();
                console.log(data);

                document.querySelector(".city").innerHTML = data.name+" "+getFlagEmoji(data.sys.country);
                
                if(slider.checked){
                    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°F";
                }
                else{
                    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
                }    
                
                document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
                document.querySelector(".wind").innerHTML = data.wind.speed+" km/h";
                document.querySelector(".undefined").style.display="none";
                document.querySelector(".error").style.display="none";

                if(data.weather[0].main=="Clouds"){
                    weatherIcon.src="images/clouds.png"
                }
                else if(data.weather[0].main=="Clear"){
                    weatherIcon.src="images/clear.png"
                }
                else if(data.weather[0].main=="Rain"){
                    weatherIcon.src="images/rain.png"
                }
                else if(data.weather[0].main=="Drizzle"){
                    weatherIcon.src="images/drizzle.png"
                }
                else if(data.weather[0].main=="Mist"){
                    weatherIcon.src="images/mist.png"
                }
                checkWeather(city);
            }

            async function checkWeather(city){
        
                if(data.weather[0].main=="Clouds"){
                    weatherIcon.src="images/clouds.png"
                }
                else if(data.weather[0].main=="Clear"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#00BFFF, #00feba)';
                }
                else if(data.weather[0].main=="Rain"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';
                }
                else if(data.weather[0].main=="Drizzle"){
                    weatherIcon.src="images/drizzle.png"
                }
                else if(data.weather[0].main=="Mist"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';
                }   
            }

            function getFlagEmoji(countryCode) {
                const codePoints = countryCode
                  .toUpperCase()
                  .split('')
                  .map(char =>  127397 + char.charCodeAt());
                return String.fromCodePoint(...codePoints);
              }
                
            }
        }