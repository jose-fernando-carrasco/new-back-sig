<!DOCTYPE html>
<html lang="en">
<head>
    {{-- <meta charset="UTF-8"> --}}
    {{-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> --}}
    {{-- <meta http-equiv="X-UA-Compatible" content="ie=edge"> --}}
    <title>Document</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/login-register.css">
    <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
</head>
<body>
    

    <div class="card">
        <input type="checkbox" id="chk" aria-hidden="true" name="">
        <div class="content">
            <div class="front">
                <div class="inner">
                     <h2>Iniciar Sesion</h2>
                    <p>Bienvenido al software diagramador C4, aqui podras diseñar software con o sin equipo de trabajo y en tiempo real. By José Fernando Oña Carrasco</p>
                    
                    
                    

                    <form class="XD" method="POST" action="{{ route('login') }}">
                        @csrf
                        <input id="email" type="text" name="email" placeholder="Correo Electronico" required>
                        <input id="password" type="password" name="password" placeholder="Contraseña" required autocomplete="current-password">
                        <label for="chk" aria-hidden="true">¿No tienes cuenta?</label>
                        
                        <div style="position: relative">
                            <div class="errores">
                                <x-auth-validation-errors class="mb-4" :errors="$errors" />
                            </div>
                        </div>
                        
                        <button type="submit">Ingresar</button>
                    </form>
                </div>
            </div>

            <div class="back">
                <div class="inner">
                     <h2>Registrarse</h2>
                    <p>Bienvenido al software diagramador C4, aqui podras diseñar software con o sin equipo de trabajo y en tiempo real. By José Fernando Oña Carrasco</p>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf                        
                        <input id="name" type="text" name="name" placeholder="Nombre de Usuario">
                        <input id="email1" type="email" name="email" placeholder="Correo electronico">
                        <input id="password1" type="password" name="password" placeholder="Contraseña min 4 caracteres" required autocomplete="current-password">
                        <input id="password_confirmation" type="password" name="password_confirmation" placeholder="Confirmar Contraseña" required>
                        <label for="chk" class="msgR" aria-hidden="true">¿Ya tienes cuenta?</label>
                        <button type="submit">Registrarse</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
    
</body>

<Script>
    // console.log();
    // get(".XD").addEventListener("submit", event => {
    //     console.log();
    // });
</Script>

</html>