const app = ({
    el: '#app',
    data() {
      return {
        imgs: [],
        imgsLike: [],
        quantity: 5,
        step: 5,
        
        titleArr: [
            {title: 'Все котики', active: true}, 
            {title: 'Любимые котики', active: false}
            ],
        title: '',
        all: true, 
        like: false,
      };
    },

    methods: {

    //Получение массива изображений    
    getCat() {

        fetch(`https://api.thecatapi.com/v1/images/search?limit=${this.quantity}&order=DESC&mime_types=jpg`)
            .then(response => {
                    return response.json();
                })
            .then (data => {
                data.forEach(item => {
                    this.imgs.push(item.url); 
                });
            })
      },

    //   Установка title страницы
      setTitle() {
        this.titleArr.forEach(item => {
            if (item.active) document.title = item.title;
        });
    },

    // Добавить котиков
      addCat() {
          this.quantity = +this.step;
          this.getCat();
      },

    //   Табуляция
      clickNav(num) {
        this.titleArr.forEach((item, index) => {
            item.active = false;
            if (index == num) {
                item.active = true;
            }   
        });
        this.setTitle();
        this.all = !this.all;
        this.like = !this.like;
      },

      // Сохранение массива избранное
      editSave() {
        let str = this.imgsLike.join(',');
        localStorage.setItem('saveLike', str);
        console.log(localStorage.getItem('saveLike'));
      },
      
      //Добавить в избранное 
      addLike(index) {
        this.imgsLike.push(this.imgs[index]);
        this.editSave();
      },

      //Удалить из избранного
      delLike(index) {
        this.imgsLike.splice(index, 1);
        this.editSave();
      },

      // Установка массива для избранного
      setLike() {
        let str = localStorage.getItem('saveLike');
        this.imgsLike = str.split(',');
      },
    },

    mounted() {
        // Начальный запуск
        this.getCat();
        // Установка title
        this.setTitle();
        //Загрузка избранного из хранилища
        this.setLike();
    },
  });
  
  new Vue(app);