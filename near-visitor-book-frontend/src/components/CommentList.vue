<script setup>
import CommentItem from "./CommentItem.vue";
import { toRefs, ref } from "vue";

const props = defineProps(["comments", "offset", "isLoading"]);
const emit = defineEmits(["del", "edit"]);

const { comments, offset, isLoading } = toRefs(props);

const currentPage = ref(offset ? offset + 1 : 1);

const remove = (id) => {
  emit("del", id);
};

const update = (id) => {
  emit("edit", id);
};
</script>

<template>
  <q-list bordered class="rounded-borders">
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <div v-if="!isLoading">
      <div v-if="comments && comments.length > 0">
        <CommentItem
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
          @remove="remove"
          @update="update"
        />
        <div class="q-pa-lg flex flex-center">
          <q-pagination v-model="offset" :max="1" />
        </div>
      </div>
      <div v-else>No comment found!</div>
    </div>
  </q-list>
</template>

<style></style>
