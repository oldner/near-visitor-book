<script setup>
import { ref, toRefs, defineEmits, watch } from "vue";
const props = defineProps(["contract", "isEditMode", "selectedComment"]);
const emit = defineEmits(["get", "endEditMode"]);
import { useQuasar } from "quasar";

const $q = useQuasar();

const isLoading = ref(false);

const formData = ref({ name: "", email: "", comment: "" });

const { contract, isEditMode, selectedComment } = toRefs(props);

watch(selectedComment, (n, o) => {
  if (isEditMode) {
    formData.value = n;
  }
});

const submit = async () => {
  isLoading.value = true;
  if (!isEditMode.value) {
    await contract.value.create(formData.value);
  } else {
    await contract.value.update({
      id: selectedComment.value.id,
      ...formData.value,
    });
    emit("endEditMode");
  }
  isLoading.value = false;
  emit("get");
  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Submitted",
  });
};
</script>

<template>
  <div class="q-mb-lg">
    <q-input
      class="q-mt-md"
      v-model="formData.name"
      :loading="isLoading"
      label="Your name"
    />
    <q-input
      class="q-mt-md"
      v-model="formData.email"
      :loading="isLoading"
      label="Email"
    />
    <q-input
      class="q-mt-md"
      v-model="formData.comment"
      :loading="isLoading"
      label="Your Comment"
      outlined
      type="textarea"
    />
    <div class="row justify-end q-mt-md">
      <q-btn
        v-if="isEditMode"
        @click="$emit('endEditMode')"
        class="q-mr-md"
        color="red"
        label="Cancel"
        :loading="isLoading"
      />
      <q-btn
        @click="submit"
        color="primary"
        :label="isEditMode ? 'Update' : 'Submit'"
        :loading="isLoading"
      />
    </div>
  </div>
</template>

<style></style>
