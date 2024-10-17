<template>
    <div>
      <img ref="image" :src="imageUrl" @load="extractColors" />
      <div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }">
        {{ color }}
      </div>
    </div>
  </template>
  
  <script>
  import ColorThief from 'colorthief';
  
  export default {
    name: "ColorThiefComponent",
    data() {
    return {
      imageUrl: 'https://i.pinimg.com/originals/a0/40/75/a04075d2d1d2591fda87c075821f45b3.jpg',
      colors: [],
    };
  },
  methods: {
    extractColors() {
      const colorThief = new ColorThief();
      const img = new Image();

      img.src = this.imageUrl;

      img.addEventListener('load', () => {
        const color = colorThief.getColor(img);
        this.colors = [`rgb(${color[0]}, ${color[1]}, ${color[2]})`];
      });
    },
  },
};
</script>