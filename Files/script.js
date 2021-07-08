        let str = "sam says sweet sounds sung so softly";
        str;

        let flag = false;

        let triggered = false;

        let secret = "";
        secret;

        const replies = [];
        replies[0] = "please do not play with me";
        replies[1] = "what if i implored with you like that?";
        replies[2] = "my time is valuable you know";
        replies[3] = "you need more practice";
        replies[4] = "you are not getting into my database imploring like that";
        replies[5] = "don't you know how to ask nicely?";
        replies[6] = "i wont even look at your question until you read all text on this page";
        replies[7] = "why are you wasting my time?";

        document.getElementById("implore").onfocus = function(){
            secret = "";
            document.getElementById("implore").value = "";
            document.getElementById("ans").value = "";
        }

        document.getElementById("question").onfocus = function(){
            document.getElementById("question").value = "";
            document.getElementById("ans").value = "";
        }

        function accept(code){
            if(code.slice(0,3) == "Key" || code == "Space" || code.slice(0,5) == "Digit" || code == "Comma" || code == "Period"){
                return true;
            }
            if(code.slice(0,6) == "Numpad"){
                switch(code.slice(6,7)){
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    case "0":
                        return true;
                }
                if(code.slice(6,13) == "Decimal"){
                    return true;
                }
            }
            return false;
        }

        document.getElementById("implore").onkeydown = function(event){
            var name = event.key;
            name;
            var code = event.code;
            code;
            let val = document.getElementById("implore").value;
            val;
            let l = document.getElementById("implore").value.length;
            if(name == "/"){
                if(flag){
                    flag = false;
                    triggered = true;
                    document.getElementById("implore").value = val + str.slice(l,l+1);
                }else{
                    flag = true;
                    let l = document.getElementById("implore").value.length;
                    document.getElementById("implore").value = val + str.slice(l,l+1);
                }
            }else{
                if(name == "Backspace"){
                    if(flag){
                        secret = secret.slice(0,secret.length-1);
                    }
                    document.getElementById("implore").value = val.slice(0,l-1)
                }else if(accept(code)){
                    if(flag &&  l<= str.length){
                        let l = document.getElementById("implore").value.length;
                        document.getElementById("implore").value = val + str.slice(l,l+1);
                        secret = secret + name;
                    }else{
                        document.getElementById("implore").value = val + name;
                    }
                }
            }
        }

        function ask(){
            let val = document.getElementById("implore").value;
            val;
            if(val == str.slice(0,21).toLocaleLowerCase() || val == str.toLocaleLowerCase()){
                document.getElementById("ans").value = secret;
                speak(secret,-1,1);
            }else{
                let x = Math.floor(Math.random() * 8);
                document.getElementById("ans").value = replies[x];
                speak(replies[x],-1,1);
            }
            reset();
        }

        function reset() {
            secret = "";
            document.getElementById("implore").value = "";
            document.getElementById("question").value = "";
        }

        function speak(sentence, pitch, rate) {
            const utterance = new SpeechSynthesisUtterance(sentence)
            utterance.rate = rate
            utterance.pitch = pitch
            window.speechSynthesis.speak(utterance)
        }
