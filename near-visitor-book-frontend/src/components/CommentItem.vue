<script setup>
import { ref, toRefs } from "vue";
const props = defineProps(["comment"]);
const { comment } = toRefs(props);
</script>

<template>
  <div>
    <q-item v-if="comment">
      <q-item-section avatar top>
        <q-icon name="account_circle" color="black" size="34px" />
      </q-item-section>

      <q-item-section top class="col-3 gt-sm">
        <q-item-label class="q-mt-sm">{{ comment.name }}</q-item-label>
      </q-item-section>

      <q-item-section top class="col-3 gt-sm">
        <q-item-label class="q-mt-sm">{{ comment.email }}</q-item-label>
      </q-item-section>

      <q-item-section top class="col-4 gt-sm">
        <q-item-label class="q-mt-sm">{{ comment.comment }}</q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            @click="$emit('update', comment.id)"
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="edit"
          />
        </div>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            @click="$emit('remove', comment.id)"
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="delete"
          />
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<style></style>
