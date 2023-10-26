const apiKey = "68451ea17fe3465a9146a23922a4daab";
            const apiUrl= "https://api.openweathermap.org/data/2.5/weather?&q=";
            
            const searchBox=document.querySelector(".search input");
            const searchBtn=document.querySelector(".search button");
            const weatherIcon=document.querySelector(".weather-icon");
            const slider = document.querySelector(".slider");

            checkWeather('minneapolis');

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
                    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°";
                }
                else{
                    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°";
                }    
                
                document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
                document.querySelector(".wind").innerHTML = data.wind.speed+" km/h";
                document.querySelector(".status").innerHTML=data.weather[0].main;
                document.querySelector(".undefined").style.display="none";
                document.querySelector(".error").style.display="none";

                // if(data.weather[0].main=="Clouds"){
                //     weatherIcon.src="images/clouds.png"
                // }
                // else if(data.weather[0].main=="Clear"){
                //     weatherIcon.src="images/clear.png"
                // }
                // else if(data.weather[0].main=="Rain"){
                //     weatherIcon.src="images/rain.png"
                // }
                // else if(data.weather[0].main=="Drizzle"){
                //     weatherIcon.src="images/drizzle.png"
                // }
                // else if(data.weather[0].main=="Mist"){
                //     weatherIcon.src="images/mist.png"
                // }

                checkTime(city);
                
            }

            async function checkWeatherBackground(city){
        
                if(data.weather[0].main=="Clouds"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';   
                }
                else if(data.weather[0].main=="Clear"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#00BFFF, #00feba)';
                }
                else if(data.weather[0].main=="Rain"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';
                }
                else if(data.weather[0].main=="Drizzle"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';
                }
                else if(data.weather[0].main=="Mist"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';
                }   
                else if(data.weather[0].main=="Haze"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';
                }
                else if(data.weather[0].main=="Thunderstorm"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';
                }  
                else if(data.weather[0].main=="Snow"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';
                }
                else if(data.weather[0].main=="Atmosphere"){
                    document.querySelector(".card").style.background='linear-gradient(135deg,#DCDCDC,#A9A9A9, #696969,#2F4F4F)';
                }  
                checkWeatherIcon(city);
            }

            async function checkWeatherIcon(city){
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
                else if(data.weather[0].main=="Haze"){
                    weatherIcon.src="images/drizzle.png" //need to be revised
                }
                else if(data.weather[0].main=="Thunderstorm"){
                    weatherIcon.src="images/drizzles.png" //need to be reivsed
                }
                else if(data.weather[0].main=="Snow"){
                    weatherIcon.src="images/drizzles.png"
                }
                else if(data.weather[0].main=="Atmosphere"){
                    weatherIcon.src="images/drizzles.png"
                }
            }

            async function checkTime(city){
                const id=data.timezone
                const now = new Date();
                const offsetTime = new Date(now.getTime() + (id * 1000));
                var hours = offsetTime.getUTCHours();
                var minutes = offsetTime.getUTCMinutes();
                console.log(`${hours}:${minutes}`);
                if(hours>12){
                    hours-=12;
                    if(minutes<10){
                        document.querySelector(".time").innerHTML=`Local Time: ${hours}:0${minutes} PM`;
                    }
                    else{
                        document.querySelector(".time").innerHTML=`Local Time: ${hours}:${minutes} PM`;
                    }
                    if(hours>=10){
                        weatherIcon.src="images/moon.png"
                        document.querySelector(".card").style.background='linear-gradient(180deg,#0C0C43, #0B0B31,#1D1D1A)';
                    }
                    else{
                        checkWeatherBackground(city);
                    }
    
                }
                else{
                    if(minutes<10){
                        document.querySelector(".time").innerHTML=`Local Time: ${hours}:0${minutes} PM`;
                    }
                    else{
                        document.querySelector(".time").innerHTML=`Local Time: ${hours}:${minutes} PM`;
                    }
                    if(hours<=5){
                        weatherIcon.src="images/moon.png"
                        document.querySelector(".card").style.background='linear-gradient(180deg,#0C0C43, #0B0B31,#1D1D1A)';
                    }
                    else{
                        checkWeatherBackground(city);
                    }
                }
                requestAnimationFrame(checkTime);
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