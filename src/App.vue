<template>
  <div id="app">
    <a-form
      :form="form"
      @submit="onSubmit"
    >
      <a-form-item label="反馈意见">
        <a-textarea
          v-decorator="['content', {
            rules: [{
              required: true,
              min: 20,
              message: '请填写20字以上',
            }],
            validateTrigger: 'blur'
          }]"
          :autosize="{ minRows: 6 }"
          placeholder="请填写15字以上的意见或建议，以便我们提供更好的服务"
        ></a-textarea>
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          type="primary"
        >提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const values = await this.form.validateFields();
      console.log(values);
    },
  },
};
</script>
