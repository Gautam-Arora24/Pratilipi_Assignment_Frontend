<template>
    <div class="card">
      <Modal :displayBasic="displayModal" :modalData="modalData" @closeModal="closeModal"/>
      <ScrollTop :threshold="200"/>
      <div v-if="loading">Loading...</div>
      <DataView v-else :value="content" :layout="layout">
      <template #header>
          <div class="grid grid-nogutter">
              <div class="col-6" style="text-align: left">
              </div>
              <div class="col-6" style="text-align: right">
                  <DataViewLayoutOptions v-model="layout" />
              </div>
          </div>
			</template>
      <template #empty>{{'No contents to show'}}</template>
      <template #list="slotProps">
				<div class="col-12">
					<div class="content-list-item cursor-pointer">
						<img src="https://picsum.photos/id/237/200/300" alt="Image of a book"
            @click="handleDisplayModal(slotProps.data)"/>
						<div class="content-list-detail">
							<div class="content-name">{{slotProps.data.title}}</div>
						</div>
						<div class="content-list-action">
              <i class="pi pi-thumbs-up content-like-icon" @click="updateLike(slotProps.data._id,slotProps.index)"></i><span class="content-like">{{slotProps.data.likes}}</span>
 						</div>
					</div>
				</div>
			</template>
			<template #grid="slotProps">
        <div class="col-12 md:col-4 ">
					<div class="content-grid-item card cursor-pointer">
						<div class="content-grid-item-top">
							<div>
								<i class="pi pi-thumbs-up content-like-icon" @click="updateLike(slotProps.data._id,slotProps.index)"></i>
								<span class="content-like">{{slotProps.data.likes}}</span>
							</div>
							<span :class="'content-badge status-'+slotProps.data.story.toLowerCase()">{{slotProps.data.title}}</span>
						</div>
						<div class="content-grid-item-content">
							<img src="https://picsum.photos/id/237/200/300" @click="handleDisplayModal(slotProps.data)" alt="Image of a book"/>
						</div>
					</div>
				</div>
			</template>

		</DataView>
	</div>
</template>

<script>
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Modal from "../components/Modal"
import ScrollTop from 'primevue/scrolltop';
import { topContent, incrementLikeCount } from '../api';

export default {
  components: {
    DataView,
    DataViewLayoutOptions,
    Modal,
    ScrollTop,
  },
  data() {
    return {
      layout: 'grid',
      content: null,
      loading: false,
      displayModal:false,
      modalData : null,
    };
  },

  mounted() {
    this.loading = true;
    topContent().then((data) => {
      this.content = data;
      this.loading = false;
    });
  },

  created(){
    document.title = 'Dashboard';
    this.$store.state.socket.on('incrementLikeCount', (data) => {
      const id = data.contentId;
      let indexToChange;
      this.content.map((item,index) => {
        if(item._id === id){
          indexToChange = index;
        }
      })
      this.content[indexToChange].likes = data.likes;
    });
  },

  methods: {
    handleDisplayModal(data){
      this.modalData = data;
      this.displayModal = true;
    },

    closeModal(){
      this.modalData = null;
      this.displayModal = false;
    },

    updateLike(contentId,index) {
      incrementLikeCount(contentId).then(data=>{
        this.index = index;
      })
    },

  },
};
</script>

<style lang="scss" scoped>
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.content-list-item:hover{
background-color:#f6f9fc;
}
.card:hover{
 background-color:#f6f9fc;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.content-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.content-description {
	margin: 0 0 1rem 0;
}

.content-like-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.content-like {
	font-weight: 600;
	vertical-align: middle;
}

::v-deep(.content-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;
  cursor:pointer;

	img {
		width: 50px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.content-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.content-price {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.content-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.content-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);

	.content-grid-item-top,
	.content-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.content-grid-item-content {
		text-align: center;
	}

	.content-price {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.content-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.content-list-detail {
			text-align: center;
		}

		.content-price {
			align-self: center;
		}

		.content-list-action {
			display: flex;
			flex-direction: column;
		}

		.content-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 100%;
		}
	}
}

</style>
