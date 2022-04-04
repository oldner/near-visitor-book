<script setup>
import { onBeforeMount } from "vue-demi";
import CommentList from "./components/CommentList.vue";
import AddComment from "./components/AddComment.vue";
import useNear from "./libs/near/near";
import config from "./libs/near/config";
import { ref } from "vue";

const near = ref({});

const PER_PAGE_LIMIT = 10;
const offset = ref(0);

const isEditMode = ref(false);
const selectedComment = ref({});
const isLoading = ref(false);

const contract = ref(null);
const currentUser = ref(null);
const nearConfig = ref(null);
const wallet = ref(null);
const comments = ref([]);

const signIn = () => {
  isLoading.value = true;
  wallet.value.requestSignIn(config.contractName, "NEAR Comment List");
};

const signOut = () => {
  wallet.value.signOut();
};

const del = (id) => {
  contract.value.del({ id });
};

const edit = (id) => {
  isEditMode.value = true;
  selectedComment.value = { ...comments.value.find((c) => c.id === id) };
};

const get = () => {
  isLoading.value = true;
  contract.value
    .get({ offset: offset.value, limit: PER_PAGE_LIMIT })
    .then((res) => {
      comments.value = res;
    });
  isLoading.value = false;
};

const endEditMode = () => {
  isEditMode.value = false;
  selectedComment.value = {};
};

onBeforeMount(async () => {
  near.value = await useNear();
  contract.value = near.value.contract;
  currentUser.value = near.value.currentUser;
  nearConfig.value = near.value.nearConfig;
  wallet.value = near.value.walletConnection;

  get();
});
</script>

<template>
  <div class="app">
    <div class="row justify-center">
      <div class="col-8">
        <q-toolbar class="app-bg" style="height: 100px">
          <img
            src="https://docs.near.org/img/near_logo.svg"
            style="width: 200px !important"
          />

          <q-toolbar-title>Near Protocol Visitor Book</q-toolbar-title>
          <div v-if="wallet && wallet.isSignedIn()">
            <span> Account ID: {{ currentUser.accountId }} </span>
            <q-btn
              class="q-ml-md"
              @click="signOut"
              flat
              round
              dense
              icon="logout"
            />
          </div>
        </q-toolbar>
        <div v-if="wallet && wallet.isSignedIn()">
          <h4>{{ isEditMode ? "Update" : "Add" }} a Comment</h4>
          <AddComment
            :contract="contract"
            @get="get"
            :isEditMode="isEditMode"
            @endEditMode="endEditMode"
            :selectedComment="selectedComment"
          />
          <h4>Comments</h4>
          <CommentList
            :isLoading="isLoading"
            :contract="contract"
            :comments="comments"
            :offset="offset"
            @del="del"
            @edit="edit"
          />
        </div>
        <div v-else class="row justify-center q-mt-xl">
          <q-btn
            @click="signIn"
            :loading="isLoading"
            color="primary"
            label="Sign In"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background: #f3f3f3;
}

.app-bg {
  background: #f3f3f3;
}
</style>
