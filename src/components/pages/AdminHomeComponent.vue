<template>
    <div class="container-fluid">
        <div class="card bg-primary shadow-none position-relative overflow-hidden"
            style="background:url(img/community.fe414895.svg) no-repeat right;">
            <div class="card-body px-4 py-3">
                <div class="row align-items-center">
                    <div class="col-md-10">
                        <h4 class="fw-semibold mb-8 text-light"><i class="fa-solid fa-badge-sheriff icon"></i>&nbsp;Panel de Administración de
                            Spiral</h4>
                        <p class="mb-0 text-light">¡ Aquí encontrarás comunidades donde poder unirte a discusiones sobre tus
                            temas favoritos y conectar con personas de todo el mundo que comparten tus intereses. Desde
                            tecnología hasta deportes, hay una comunidad para todos. ¡Elige la que más te guste y conversa
                            ahora mismo!</p>
                    </div>
                <div class="col-md-2">
                    <div class="text-center mb-2"><button type="button" class="btn btn-info">Crear Comunidad
                        </button><!--- Esto abre un modal con el formulario--></div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
            <div class="col-sm-6 col-lg-4 col-xl-2">
              <div class="p-4 text-center bg-light-primary card shadow-none rounded-3">
                <img src="https://cdn-icons-png.flaticon.com/64/1256/1256650.png" width="50" height="50" class="mb-6 mx-auto" alt="">
                <p class="fw-semibold text-primary mb-1">Usuarios</p>
                <h4 class="fw-semibold text-primary mb-0">3,685</h4>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4 col-xl-2">
              <div class="p-4 text-center bg-light-warning card shadow-none rounded-2">
                <img src="https://cdn-icons-png.flaticon.com/64/1055/1055664.png " width="50" height="50" class="mb-6 mx-auto" alt="">
                <p class="fw-semibold text-warning mb-1">Publicaciones</p>
                <h4 class="fw-semibold text-warning mb-0">956</h4>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4 col-xl-2">
              <div class="p-4 text-center bg-light-info card shadow-none rounded-2">
                <img src="https://cdn-icons-png.flaticon.com/64/1017/1017470.png " width="50" height="50" class="mb-6 mx-auto" alt="">
                <p class="fw-semibold text-info mb-1">Comentarios</p>
                <h4 class="fw-semibold text-info mb-0">932</h4>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4 col-xl-2">
              <div class="p-4 text-center bg-light-danger card shadow-none rounded-2">
                <img src="https://cdn-icons-png.flaticon.com/64/1055/1055669.png" width="50" height="50" class="mb-6 mx-auto" alt="">
                <p class="fw-semibold text-danger mb-1">Reacciones</p>
                <h4 class="fw-semibold text-danger mb-0">402</h4>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4 col-xl-2">
              <div class="p-4 text-center bg-light-success card shadow-none rounded-2">
                <img src="https://cdn-icons-png.flaticon.com/64/1531/1531117.png" width="50" height="50" class="mb-6 mx-auto" alt="">
                <p class="fw-semibold text-success mb-1">Comunidades</p>
                <h4 class="fw-semibold text-success mb-0">96</h4>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4 col-xl-2">
              <div class="p-4 text-center bg-light-info card shadow-none rounded-2">
                <img src="https://cdn-icons-png.flaticon.com/64/2550/2550282.png" width="50" height="50" class="mb-6 mx-auto" alt="">
                <p class="fw-semibold text-info mb-1">Otros</p>
                <h4 class="fw-semibold text-info mb-0">48</h4>
              </div>
            </div>
          </div>

</div></template>


<script>
export default {
    name: "AdminComponent",
};
</script>