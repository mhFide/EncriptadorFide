
    var botonEncriptar = document.getElementById('botonEncriptar');
    var textoOriginal = document.getElementById('textoOriginal');
    var btnCopiar =  document.getElementById('btnCopiar');

    textoOriginal.addEventListener('input', function(event) {
        var input = event.target;
        var texto = input.value.toUpperCase();
        texto = quitarAcentos(texto);
        input.value = texto;
    });

    botonEncriptar.addEventListener('click', function() {
        var textoOriginal = document.getElementById('textoOriginal').value;
        var textoEncriptado = encriptarTexto(textoOriginal);
        document.getElementById('textoEncriptado').value = textoEncriptado;
    });

    btnCopiar.addEventListener('click', function() {
        var cuadroDeTexto = document.getElementById("textoEncriptado");

        if (!navigator.clipboard){
            cuadroDeTexto.select();
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
            alert("El texto se ha copiado al portapapeles.");
        } else{
            navigator.clipboard.writeText(cuadroDeTexto.value).then(
                function(){
                    alert("El texto se ha copiado al portapapeles."); // success 
                })
              .catch(
                 function() {
                    alert("err"); // error
              });
        } 

    });

      
    function encriptarTexto(texto) {
        var textoEncriptado = '';
        for (var i = 0; i < texto.length; i++) {
            var charCode = texto.charCodeAt(i);
            // Asumiendo que la encriptación es simplemente cambiando las letras
            if (charCode >= 65 && charCode <= 90) {
                // Mayúsculas
                charCode = ((charCode - 65 + 1) % 26) + 65; // Cambia una letra hacia adelante
            } else if (charCode >= 97 && charCode <= 122) {
                // Minúsculas
                charCode = ((charCode - 97 + 1) % 26) + 97; // Cambia una letra hacia adelante
            }
            textoEncriptado += String.fromCharCode(charCode);
        }
        return textoEncriptado;
    }

    function quitarAcentos(texto) {
        var mapaAcentos = {
            'Á': 'A',
            'É': 'E',
            'Í': 'I',
            'Ó': 'O',
            'Ú': 'U'
        };
    
        return texto.replace(/[ÁÉÍÓÚ]/g, function(letra) {
            return mapaAcentos[letra];
        });
    }
    
