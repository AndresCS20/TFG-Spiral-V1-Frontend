<template>
    <!-- Modal Global Personalización -->
    <div class="modal fade" id="themes" tabindex="-1" aria-labelledby="themes" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Cambia de Tema</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row row-cols-2 row-cols-lg-3 g-1 g-lg-1">

              <div class="col" data-bs-theme="auto">
                <button type="button" class="btn auto ps-4 pe-2" data-bs-theme-value="auto">
                  <div class="px-5 py-4 themebody">
                    Auto
                    <div class="themecolorflex">
                      <span class="themecolor themecolorprimary" title="Color Primario"></span>
                      <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                      <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                      <span class="themecolor themecolordanger" title="Color Peligro"></span>
                      <span class="themecolor themecolorinfo" title="Color Info"></span></div>
                  </div>
                </button>
              </div>
              <div class="col" data-bs-theme="dark">
                <button type="button" class="btn dark ps-4 pe-2" data-bs-theme-value="dark">
                  <div class="px-5 py-4 themebody">
                    Oscuro
                    <div class="themecolorflex">
                      <span class="themecolor themecolorprimary" title="Color Primario"></span>
                      <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                      <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                      <span class="themecolor themecolordanger" title="Color Peligro"></span>
                      <span class="themecolor themecolorinfo" title="Color Info"></span></div>
                  </div>
                </button>
              </div>
              <div class="col" data-bs-theme="light">
                <button type="button" class="btn light ps-4 pe-2" data-bs-theme-value="light">
                  <div class="px-5 py-4 themebody">
                    Claro
                    <div  class="themecolorflex">
                      <span class="themecolor themecolorprimary" title="Color Primario"></span>
                      <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                      <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                      <span class="themecolor themecolordanger" title="Color Peligro"></span>
                      <span class="themecolor themecolorinfo" title="Color Info"></span></div>
                  </div>
                </button>
              </div>
              <div class="col" data-bs-theme="cerulean">
                <button type="button" class="btn ceruelan ps-4 pe-2" data-bs-theme-value="cerulean">
                  <div class="px-5 py-4  themebody">Cerulean<div class="themecolorflex">
                      <span class="themecolor themecolorprimary" title="Color Primario"></span>
                      <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                      <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                      <span class="themecolor themecolordanger" title="Color Peligro"></span>
                      <span class="themecolor themecolorinfo" title="Color Info"></span>
                    </div>
                  </div>
                </button>
              </div>
              <div class="col" data-bs-theme="darkly">
                <button type="button" class="btn darkly ps-4 pe-2" data-bs-theme-value="darkly">
                  <div class="px-5 py-4  themebody">Darkly<div class="themecolorflex">
                      <span class="themecolor themecolorprimary" title="Color Primario"></span>
                      <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                      <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                      <span class="themecolor themecolordanger" title="Color Peligro"></span>
                      <span class="themecolor themecolorinfo" title="Color Info"></span>
                    </div>
                  </div>
                </button>
              </div>
              <div class="col" data-bs-theme="lux">
                <button type="button" class="btn lux ps-4 pe-2" data-bs-theme-value="lux">
                  <div class="px-5 py-4 rounded themebody">Lux<div class="themecolorflex">
                      <span class="themecolor themecolorprimary" title="Color Primario"></span>
                      <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                      <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                      <span class="themecolor themecolordanger" title="Color Peligro"></span>
                      <span class="themecolor themecolorinfo" title="Color Info"></span>
                    </div>
                  </div>
                </button>
              </div>
              <div class="col" data-bs-theme="litera">
                <button type="button" class="btn litera ps-4 pe-2" data-bs-theme-value="litera">
                  <div class="px-5 py-4 themebody">Litera<div class="themecolorflex">
                      <span class="themecolor themecolorprimary" title="Color Primario"></span>
                      <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                      <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                      <span class="themecolor themecolordanger" title="Color Peligro"></span>
                      <span class="themecolor themecolorinfo" title="Color Info"></span>
                    </div>
                  </div>
                </button>
              </div>
              <div class="col" data-bs-theme="solar">
                <button type="button" class="btn solar ps-4 pe-2" data-bs-theme-value="solar">
                  <div class="px-5 py-4 themebody">Solar<div class="themecolorflex">
                      <span class="themecolor themecolorprimary" title="Color Primario"></span>
                      <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                      <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                      <span class="themecolor themecolordanger" title="Color Peligro"></span>
                      <span class="themecolor themecolorinfo" title="Color Info"></span>
                    </div>
                  </div>
                </button>
              </div>

              <div class="col" data-bs-theme="united">
                <button type="button" class="btn united ps-4 pe-2" data-bs-theme-value="united">
                  <div class="px-5 py-4 themebody">United<div class="themecolorflex">
                      <span class="themecolor themecolorprimary" title="Color Primario"></span>
                      <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                      <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                      <span class="themecolor themecolordanger" title="Color Peligro"></span>
                      <span class="themecolor themecolorinfo" title="Color Info"></span>
                  </div>
                </div>
              </button>
            </div>

            <div class="col" data-bs-theme="quartz">
              <button type="button" class="btn quartz ps-4 pe-2" data-bs-theme-value="quartz">
                <div class="px-5 py-4 themebody">Quartz<div class="themecolorflex">
                    <span class="themecolor themecolorprimary" title="Color Primario"></span>
                    <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                    <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                    <span class="themecolor themecolordanger" title="Color Peligro"></span>
                    <span class="themecolor themecolorinfo" title="Color Info"></span>
                  </div>
                </div>
              </button>
            </div>

            <div class="col" data-bs-theme="sketchy">
              <button type="button" class="btn sketchy ps-4 pe-2" data-bs-theme-value="sketchy">
                <div class="px-5 py-4 themebody">Sketchy<div class="themecolorflex">
                    <span class="themecolor themecolorprimary" title="Color Primario"></span>
                    <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                    <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                    <span class="themecolor themecolordanger" title="Color Peligro"></span>
                    <span class="themecolor themecolorinfo" title="Color Info"></span>
                  </div>
                </div>
              </button>
            </div>


            <div class="col" data-bs-theme="vapor">
              <button type="button" class="btn vapor ps-4 pe-2" data-bs-theme-value="vapor">
                <div class="px-5 py-4 themebody">Vapor<div class="themecolorflex">
                    <span class="themecolor themecolorprimary" title="Color Primario"></span>
                    <span class="themecolor themecolorsecondary" title="Color Secundario"></span>
                    <span class="themecolor themecolorsuccess" title="Color Exito"></span>
                    <span class="themecolor themecolordanger" title="Color Peligro"></span>
                    <span class="themecolor themecolorinfo" title="Color Info"></span>
                  </div>
                </div>
              </button>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemesModalSubComponent'
}
</script>