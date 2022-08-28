<template>
    <div class="card">
      <DataView :value="content" :layout="layout">
      <template #header>
          <div class="grid grid-nogutter">
              <div class="col-6" style="text-align: left">
              </div>
              <div class="col-6" style="text-align: right">
                  <DataViewLayoutOptions v-model="layout" />
              </div>
          </div>
			</template>
      <template #empty>No content to show.</template>
      <template #list="slotProps">
				<div class="col-12">
					<div class="content-list-item">
						<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image of a book"/>
						<div class="content-list-detail">
							<div class="content-name">{{slotProps.data.story}}</div>
							<div class="content-description">{{slotProps.data.title}}</div>
							<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
							<i class="pi pi-thumbs-up content-like-icon"></i><span class="content-like">{{slotProps.data.likes}}</span>
						</div>
						<div class="content-list-action">
							<span class="content-price">${{slotProps.data.story}}</span>
						</div>
					</div>
				</div>
			</template>
			<template #grid="slotProps">
        <div class="col-12 md:col-4">
					<div class="content-grid-item card">
						<div class="content-grid-item-top">
							<div>
								<i class="pi pi-thumbs-up content-like-icon"></i>
								<span class="content-like">{{slotProps.data.likes}}</span>
							</div>
							<span :class="'content-badge status-'+slotProps.data.story.toLowerCase()">{{slotProps.data.title}}</span>
						</div>
						<div class="content-grid-item-content">
							<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.name"/>
							<div class="content-name">{{slotProps.data.likes}}</div>
							<div class="content-description">{{slotProps.data._id}}</div>
						</div>
						<div class="content-grid-item-bottom">
							<span class="content-price">${{slotProps.data.likes}}</span>
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
import { topContent } from '../api';

export default {
  components: {
    DataView,
    DataViewLayoutOptions,
  },
  data() {
    return {
      layout: 'grid',
      content: null,
    };
  },
  mounted() {
    // eslint-disable-next-line no-return-assign
    topContent().then((data) => {
      this.content = data;
    });
  },
  methods: {

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
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}

</style>
