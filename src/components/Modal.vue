<template>
  <Dialog header="Details of the content" v-model:visible="displayBasic" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}"
  :closable="false" :modal="true" >
          <div class="item">
            <span class="text-xl"> Title - </span>
            <span>{{modalData.title}}</span>
          </div>

          <div class="item">
            <span class="text-xl"> Story Content - </span>
            <div class="content max-h-4rem inline-block">{{modalData.story}}</div>
          </div>

          <div class="item">
            <span class="text-xl"> Number of Likes - </span>
            <span>{{modalData.likes}}</span>
          </div>

          <div class="item">
            <span class="text-xl"> Date Published - </span>
            <span>{{modalData.datePublished.substring(0,10)}}</span>
          </div>
        <template #footer>
            <Button label="Close" @click="closeBasic"/>
        </template>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from "primevue/button"

export default {
  components: {
    Dialog,
    Button,
  },
  props: {
    displayBasic: Boolean,
    modalData: Object,
  },
  methods:{
    closeBasic() {
      this.$emit('closeModal');
    },
  }
};
</script>

<style>
.item{
  margin: 30px 0px 30px 0px;
}
</style>
