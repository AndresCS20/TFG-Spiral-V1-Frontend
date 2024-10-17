<template>
<div class="modal fade" id="imageModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Publicar imagen</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
          <div class="modal-body">
            <form class="w-100 mb-2">
                <textarea class="form-control fs-3 border-0" rows="2" placeholder="Comparte tus pensamientos..."></textarea>
            </form><div class="uploadDropzone" style="border: thin dashed #aaa;padding: 40px;text-align: center;border-radius: 5px;">
                    
                        <i class="fa fa-solid fa-cloud fs-6"></i>
                        <h5>Arrastra los archivos aquí para subirlos</h5>
                        <p class="text-muted">o <button type="button" class="btn btn-link p-0 mb-1"><b>navegue</b></button> para  elegir archivos.</p>
                    </div>
                </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success">Publicar&nbsp;<i class="fa-solid fa-paper-plane-top"></i></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ImageModalSubComponent'
}
</script>