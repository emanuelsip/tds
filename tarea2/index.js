let registerUsers = [];
        const form = document.getElementById('formulario');

        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const telefono = document.getElementById('telefono');
        const password = document.getElementById('password');
        const feachanac = document.getElementById('feachanac');
        const inputs = document.getElementsByClassName('noempty');
        const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const phonenumber =  /^\+?[1-9]\d{1,14}$/;
        const passwordVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.+#])[A-Za-z\d$@$!%*?&.+#]{10,}$/;
        // console.log(inputs);
        Array.from(inputs).forEach((element) => {
            element.addEventListener('change',()=>{
                cleanError(element);
            })
        });
        
        form.addEventListener('submit',(event)=>{
            event.preventDefault();
            let countNull = 0;
            let continues = true;
            Array.from(inputs).forEach((element) => {
                if(element.value == ''){
                    setError(element,'Campo vacio');
                    countNull++;
                    continues = false;
                }
                // console.log(element.value);
            });
            // console.log(emailValidation.test(correo));
            if(correo.value !='' && emailValidation.test(correo.value)===false){
                setError(correo,'Correo invalido');
                continues = false;
            }
            if(telefono.value !='' && phonenumber.test(telefono.value)===false){
                setError(telefono,'Telefono invalido');
                continues = false;
            }
            if(password.value !='' && !passwordVal.test(password.value)===false){
                setError(password,'La contrasena no comple con lo requerido:<br>\
                                    Al menos un mayusculas ABCD, etc<br>\
                                    Al menos un minusculas abc, etc<br>\
                                    Al menos un numero 1234567980 etc<br>\
                                    Al menos un simbolo $#*+.<br>\
                                    Minimo 8 caracteres');
                continues = false;
            }
            if(feachanac != ''){
                const currentDate = new Date();
                const givenDate = new Date(feachanac.value);
                const timeDiff = currentDate.getTime() - givenDate.getTime();
                const eighteenYearsInMillis = (18 * 365 + 4) * 24 * 60 * 60 * 1000;
                if (timeDiff < eighteenYearsInMillis) {
                    setError(feachanac,'Debes ser mayor de edad');
                    continues = false;
                }
            }
            console.log(continues);
            if(continues==true)
                window.comunicacion.registroValidacion(correo.value);

        })
        function setError(element,message){
            let parentEl = element.parentElement.querySelector('span');
                    parentEl.innerHTML = message;
                    parentEl.style.display = 'block';
        }
        function cleanError(element){
            let parentEl = element.parentElement.querySelector('span');
                    parentEl.innerHTML = '';
                    parentEl.style.display = 'none';
        }