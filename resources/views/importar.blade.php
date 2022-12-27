<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Importar</title>
</head>
<body>
    <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button type="submit" class="dropdown-item">Cerrar Sesión</button>
    </form>
    <h1>Importar Lineas</h1>
    <form action="{{route('import')}}" enctype="multipart/form-data" method="post">
        @csrf
        <input type="file" name="excel" accept=".xlsx, .xls">
        <br>
        <input type="text" name="contra" placeholder="contraseña...">
        <br>
        <button type="submit">Importar</button>
    </form>

    <h1>Importar Recorridos</h1>
    <form action="{{route('import.recorrido')}}" enctype="multipart/form-data" method="post">
        @csrf
        <input type="file" name="excel1" accept=".xlsx, .xls">
        <br>
        <input type="text" name="contra1" placeholder="contraseña...">
        <br>
        <button type="submit">Importar</button>
    </form>

    <h1>Importar Puntos</h1>
    <form action="{{route('import.puntos')}}" enctype="multipart/form-data" method="post">
        @csrf
        <input type="file" name="excel2" accept=".xlsx, .xls">
        <br>
        <input type="text" name="contra2" placeholder="contraseña...">
        <br>
        <button type="submit">Importar</button>
    </form>
</body>
</html>