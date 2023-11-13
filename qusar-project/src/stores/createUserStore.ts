import { defineStore } from 'pinia';
import {
  JobDepartmentApi,
  JobIndustryApi,
  LanguageApi,
  userApi,
} from 'src/utils/BaseApiService';
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
        zip: '',
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
    skills: [
      {
        name: '',
        desc: '',
      },
    ],
    NotificationSettings: {
      onMessageRecieve: true,
      onCommentReply: true,
      onProductUpdate: true,
      onOffers: true,
    },
  });

  const jobDepartments = ref([]);
  const jobIndustry = ref([]);
  const languages = ref([]);

  const addNewFavoriteLinks = () => {
    form.value.favoriteLinks.push({
      link: '',
    });
  };

  const popFavoriteLinks = () => {
    form.value.favoriteLinks.pop();
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
      zip: '',
      startDate: '',
      endDate: '',
      desc: '',
      isCurrent: false,
    });
  };

  const popWorkExperience = () => {
    form.value.workExperience.pop();
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

  const popEducation = () => {
    form.value.education.pop();
  };

  const addNewLangauge = () => {
    form.value.lanuages.push({
      language_id: '',
    });
  };

  const popLanguage = () => {
    form.value.lanuages.pop();
  };

  const addNewSkill = () => {
    form.value.skills.push({
      name: '',
      desc: '',
    });
  };

  const popSkill = () => {
    form.value.skills.pop();
  };

  const getJobDepartments = async () => {
    await JobDepartmentApi.index().then(({ data }) => {
      jobDepartments.value = (data.value as any).map((d: any) => ({
        label: d.name,
        value: d.id,
      }));
    });
  };

  const getJobIndustry = async () => {
    await JobIndustryApi.index().then(({ data }) => {
      jobIndustry.value = (data.value as any).map((d: any) => ({
        label: d.name,
        value: d.id,
      }));
    });
  };

  const getLangauges = async () => {
    await LanguageApi.index().then(({ data }) => {
      languages.value = (data.value as any).map((d: any) => ({
        label: d.name,
        value: d.id,
      }));
    });
  };

  const { execute: submit, loading: posting } = userApi.post(form.value);

  return {
    form,
    posting,
    submit,
    addNewFavoriteLinks,
    addNewWorkExperience,
    addNewEducation,
    popEducation,
    popFavoriteLinks,
    popWorkExperience,
    addNewLangauge,
    popLanguage,
    getJobDepartments,
    jobDepartments,
    getJobIndustry,
    jobIndustry,
    getLangauges,
    languages,
    addNewSkill,
    popSkill,
  };
});

export default createUserStore;
