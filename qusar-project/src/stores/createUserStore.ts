import { defineStore } from 'pinia';
import { userApi } from 'src/utils/BaseApiService';
import { ref } from 'vue';

const createUserStore = defineStore('createUser', () => {
  const form = ref({
    image: null,
    user: {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      password_confirmaton: '',
      phone: '',
      desc: '',
      isActive: false,
      isPublic: false,
    },
    address: {
      address: '',
      continentId: '',
      countryId: '',
      stateId: '',
      cityId: '',
      streetId: '',
      zip: '',
    },
    social: {
      website: '',
      facebook: '',
      twitter: '',
      instagram: '',
      pintrest: '',
      linkedin: '',
      vk: '',
      whatsapp: '',
      telegram: '',
    },
    favoriteLinks: [{ link: '' }],
    workExperience: [
      {
        jobIndustryId: '',
        jobFunction: '',
        jobTitle: '',
        jobDepartmentId: '',
        companyName: '',
        companySize: '',
        cityId: '',
        stateId: '',
        countryId: '',
        startDate: '',
        endDate: '',
        desc: '',
        isCurrent: false,
      },
    ],
    education: [
      {
        institute: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        desc: '',
      },
    ],
    lanuages: [
      {
        language_id: '',
      },
    ],
    skills: [],
    NotificationSettings: {
      onMessageRecieve: true,
      onCommentReply: true,
      onProductUpdate: true,
      onOffers: true,
    },
  });

  const { execute: submit, loading: posting } = userApi.post(form.value);

  const addNewFavoriteLinks = () => {
    form.value.favoriteLinks.push({
      link: '',
    });
  };

  const addNewWorkExperience = () => {
    form.value.workExperience.push({
      jobIndustryId: '',
      jobFunction: '',
      jobTitle: '',
      jobDepartmentId: '',
      companyName: '',
      companySize: '',
      cityId: '',
      stateId: '',
      countryId: '',
      startDate: '',
      endDate: '',
      desc: '',
      isCurrent: false,
    });
  };

  const addNewEducation = () => {
    form.value.education.push({
      institute: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      desc: '',
    });
  };

  return {
    form,
    posting,
    submit,
    addNewFavoriteLinks,
    addNewWorkExperience,
    addNewEducation,
  };
});

export default createUserStore;
