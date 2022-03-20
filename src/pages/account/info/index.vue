<template>
  <div class="row cc-admin q-pa-sm">
    <div class="col-md-4 col-xs-12">
      <q-card flat class="bg-white no-border-radius">
        <q-card-section class="text-center">
          <q-img
            :src="introduceData.imgSrc"
            style="max-width: 140px"
          ></q-img>
          <q-item-label class="q-my-sm"
            ><strong>{{
              introduceData.name
            }}</strong></q-item-label
          >
          <q-item-label>{{
            introduceData.motto
          }}</q-item-label>
          <div class="row text-left q-mt-lg q-ml-sm text-body2 text-grey-9">
            <q-item-label class="col-12">
              <q-icon
                name="contact_mail"
                color="grey-9"
                size="16px"
                class="q-mr-xs"
              />
              {{ introduceData.job }}
            </q-item-label>
            <q-item-label class="col-12">
              <q-icon
                name="contact_mail"
                color="grey-9"
                size="16px"
                class="q-mr-xs"
              />
              {{ introduceData.department }}
            </q-item-label>
            <q-item-label class="col-12">
              <q-icon
                name="contact_mail"
                color="grey-9"
                size="16px"
                class="q-mr-xs"
              />
              {{ introduceData.address }}
            </q-item-label>
          </div>
        </q-card-section>
        <q-separator inset="" />
        <q-card-section>
          <q-item-label class="text-body1">标签</q-item-label>
          <q-item-label class="text-body1 q-gutter-y-sm">
            <span
              :key="index"
              v-for="(item, index) in labelDatas"
            >
              <q-chip
                v-if="item.outline"
                outline
                size="sm"
                :selected.sync="item.selected"
                :removable="item.removable"
                v-model="item.show"
                :color="item.color"
                :text-color="item.textColor"
                :icon="item.icon"
                :label="item.label"
                :square="item.square"
                :class="item.class"
              />
              <q-chip
                v-else
                size="sm"
                :selected.sync="item.selected"
                :removable="item.removable"
                v-model="item.show"
                :color="item.color"
                :text-color="item.textColor"
                :icon="item.icon"
                :label="item.label"
                :square="item.square"
                :class="item.class"
              />
            </span>
            <span>
              <q-chip size="sm" removable color="info" text-color="white">
                <q-avatar>
                  <q-img src="/img/account/avatar5.jpg" />
                </q-avatar>
                John
              </q-chip>
            </span>
          </q-item-label>
        </q-card-section>
        <q-separator inset="" />
        <q-card-section>
          <q-item-label class="text-body1">团队</q-item-label>
          <q-item-label class="q-gutter-sm">
            <q-chip
              size="16px"
              color="white"
              :key="index"
              v-for="(item, index) in groupDatas"
            >
              <q-avatar size="sm">
                <q-img :src="item.imgSrc" />
              </q-avatar>
              {{ item.label }}
            </q-chip>
          </q-item-label>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-8 col-xs-12 q-px-sm">
      <q-tabs
        v-model="centerTab"
        class="bg-white"
        active-color="primary"
        indicator-color="primary"
        align="left"
        content-class="text-grey-9"
        narrow-indicator
      >
        <q-tab name="titles">
          <span>
            <q-icon name="list_alt" size="sm" />
            文章({{ articlesDatas.length }})
          </span>
        </q-tab>
        <q-tab name="applications">
          <span>
            <q-icon name="settings_applications" size="sm" />应用({{
              applicationsDatas.length
            }})
          </span>
        </q-tab>
        <q-tab name="projects">
          <span>
            <q-icon name="fact_check" size="sm" />项目({{
              projectDatas.length
            }})
          </span>
        </q-tab>
      </q-tabs>
      <q-separator />
      <q-tab-panels
        v-model="centerTab"
        animated
        transition-prev="fade"
        transition-next="fade"
      >
        <q-tab-panel name="titles" class="q-px-sm q-pt-none">
          <cc-page :items="articlesDatas" class="q-mt-sm">
            <template v-slot:item="props">
              <div class="q-pb-sm">
                <cc-shadow class="q-pa-sm">
                  <q-item-section>
                    <q-item-label class="text-body1 q-mb-sm">
                      <strong> Alipay-{{ props.item.index }} </strong>
                    </q-item-label>
                    <q-item-label class="q-mb-sm">
                      <q-chip
                        label="Sika Design"
                        class="cursor-pointer"
                        color="primary"
                        text-color="white"
                        square
                        size="12px"
                      ></q-chip>
                      <q-chip
                        label="设计语言"
                        class="cursor-pointer"
                        color="info"
                        text-color="white"
                        square
                        size="12px"
                      ></q-chip>
                      <q-chip
                        label="蚂蚁金服"
                        class="cursor-pointer"
                        color="deep-orange"
                        text-color="white"
                        square
                        size="12px"
                      ></q-chip>
                    </q-item-label>
                    <p class="text-grey-8 q-mb-sm q-pl-xs">
                      段落示意：蚂蚁金服设计平台
                      ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                      ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。
                    </p>
                    <q-item-label
                      class="row text-body2 text-grey-7 items-center q-gutter-x-xs"
                    >
                      <q-chip
                        color="white"
                        text-color="primary"
                        class="col-auto cursor-pointer"
                      >
                        <q-avatar size="18px">
                          <img :src="props.item.imgSrc" />
                        </q-avatar>
                        姜宇
                      </q-chip>
                      <span class="col-auto q-ml-none">发布在</span>
                      <span class="col-auto text-primary cursor-pointer"
                        >https://ant.design</span
                      >
                      <span class="col-sm-auto col-xs-12 q-pl-xs">
                        {{ props.item.publishTime }}
                      </span>
                    </q-item-label>
                    <div class="q-mt-sm row items-center" style="height: 24px">
                      <q-btn-group flat>
                        <q-btn
                          flat
                          dense
                          icon="star_border"
                          :label="props.item.collection"
                          size="12px"
                          class="q-mr-sm"
                          color="primary"
                        />
                        <q-separator vertical />
                        <q-btn
                          flat
                          dense
                          icon="thumb_up"
                          :label="props.item.star"
                          size="12px"
                          color="grey-6"
                          class="q-mx-sm"
                        />
                        <q-separator vertical />
                        <q-btn
                          flat
                          dense
                          icon="message"
                          :label="props.item.word"
                          size="12px"
                          color="grey-6"
                          class="q-mx-sm"
                        />
                      </q-btn-group>
                    </div>
                  </q-item-section>
                </cc-shadow>
              </div>
              <q-separator spaced="10px" />
            </template>
          </cc-page>
        </q-tab-panel>
        <q-tab-panel name="applications" class="q-px-sm q-pt-none">
          <cc-page
            :items="applicationsDatas"
            class="q-mt-sm"
            item-class="col-xl-3 col-sm-4 col-xs-12"
          >
            <template v-slot:item="props">
              <q-intersection once transition="scale">
                <cc-shadow>
                  <q-card square bordered flat>
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar>
                          <img
                            style="width: 30px; height: 30px"
                            :src="props.item.imgSrc"
                          />
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-body1">
                          <strong>爱美丽-{{ props.item.index }}</strong>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="block text-center q-pt-xs q-mb-sm">
                      <q-item-label class="row" caption>
                        <span class="col">活跃用户</span>
                        <span class="col">新增用户</span>
                      </q-item-label>
                      <q-item-label class="row text-body1 text-black">
                        <span class="col"
                          ><strong>{{ props.item.activeUser }}</strong
                          >万</span
                        >
                        <span class="col"
                          ><strong>{{ props.item.increaseUser }}</strong></span
                        >
                      </q-item-label>
                    </q-item>
                    <q-separator />
                    <q-item class="q-px-sm">
                      <q-btn-group flat spread class="full-width">
                        <q-btn
                          flat
                          dense
                          icon="save_alt"
                          size="sm"
                          class="q-mr-sm"
                          color="grey-6"
                        >
                          <q-tooltip>下载</q-tooltip>
                        </q-btn>
                        <q-separator vertical inset="" />
                        <q-btn
                          flat
                          dense
                          icon="edit"
                          size="sm"
                          color="grey-6"
                          class="q-mx-sm"
                        >
                          <q-tooltip>编辑</q-tooltip>
                        </q-btn>
                        <q-separator vertical inset="" />
                        <q-btn
                          flat
                          dense
                          icon="share"
                          size="sm"
                          color="grey-6"
                          class="q-mx-sm"
                        >
                          <q-tooltip>分享</q-tooltip>
                        </q-btn>
                        <q-separator vertical inset="" />
                        <q-btn
                          flat
                          dense
                          icon="more_horiz"
                          size="sm"
                          color="grey-6"
                          class="q-mx-sm"
                        >
                          <q-tooltip>更多</q-tooltip>
                        </q-btn>
                      </q-btn-group>
                    </q-item>
                  </q-card>
                </cc-shadow>
              </q-intersection>
            </template>
          </cc-page>
        </q-tab-panel>
        <q-tab-panel name="projects" class="q-px-sm q-pt-none">
          <cc-page
            :items="projectDatas"
            class="q-mt-sm"
            item-class="col-xl-3 col-sm-4 col-xs-12"
          >
            <template v-slot:item="props">
              <q-intersection once transition="scale">
                <cc-shadow>
                  <q-card square bordered flat class="q-pb-sm">
                    <q-img :src="props.item.pictureSrc" :ratio="16 / 10" />
                    <q-list class="q-mt-md">
                      <q-item dense class="text-body1">
                        <strong>Alipay-{{ props.item.index }}</strong>
                      </q-item>
                      <q-item dense>
                        那是一种内在的东西， 他们到达不了，也无法
                      </q-item>
                      <q-item dense clickable>
                        <q-item-section style="font-size: 12px">
                          {{ props.item.hour }}小时前
                        </q-item-section>
                        <span>
                          <q-img
                            src="/img/user/man.jpg"
                            class="account-avatar"
                          >
                            <q-tooltip>张三</q-tooltip>
                          </q-img>
                          <q-img
                            src="/img/user/woman.jpg"
                            class="account-avatar"
                          >
                            <q-tooltip>豆豆</q-tooltip>
                          </q-img>
                          <q-img
                            src="/img/user/man.jpg"
                            class="account-avatar"
                          >
                            <q-tooltip>乐乐</q-tooltip>
                          </q-img>
                        </span>
                      </q-item>
                    </q-list>
                  </q-card>
                </cc-shadow>
              </q-intersection>
            </template>
          </cc-page>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import CcShadow from 'components/ccshadow';
import CcPage from 'components/ccpage';

export default {
  name: 'Center',
  components: {
    CcPage,
    CcShadow,
  },
  data() {
    return {
      centerTab: 'titles',
      applicationsDatas: [{
        index: 0, imgSrc: '/img/account/kZzEzemZyKLKFsojXItE.png', activeUser: 3, increaseUser: 1685,
      }, {
        index: 1, imgSrc: '/img/account/siCrBXXhmvTQGWPNLBow.png', activeUser: 17, increaseUser: 676,
      }, {
        index: 2, imgSrc: '/img/account/sfjbOqnsXXJgNCjCzDBL.png', activeUser: 14, increaseUser: 1155,
      }, {
        index: 3, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', activeUser: 17, increaseUser: 1829,
      }, {
        index: 4, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', activeUser: 13, increaseUser: 632,
      }, {
        index: 5, imgSrc: '/img/account/zOsKZmFRdUtvpqCImOVY.png', activeUser: 11, increaseUser: 1056,
      }, {
        index: 6, imgSrc: '/img/account/sfjbOqnsXXJgNCjCzDBL.png', activeUser: 2, increaseUser: 817,
      }, {
        index: 7, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', activeUser: 9, increaseUser: 25,
      }, {
        index: 8, imgSrc: '/img/account/kZzEzemZyKLKFsojXItE.png', activeUser: 19, increaseUser: 523,
      }, {
        index: 9, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', activeUser: 13, increaseUser: 1110,
      }, {
        index: 10, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', activeUser: 16, increaseUser: 1269,
      }, {
        index: 11, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', activeUser: 16, increaseUser: 335,
      }, {
        index: 12, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', activeUser: 9, increaseUser: 1070,
      }, {
        index: 13, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', activeUser: 12, increaseUser: 504,
      }, {
        index: 14, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', activeUser: 7, increaseUser: 1603,
      }, {
        index: 15, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', activeUser: 14, increaseUser: 1186,
      }, {
        index: 16, imgSrc: '/img/account/kZzEzemZyKLKFsojXItE.png', activeUser: 20, increaseUser: 1539,
      }, {
        index: 17, imgSrc: '/img/account/avatar5.jpg', activeUser: 5, increaseUser: 872,
      }],
      articlesDatas: [{
        index: 0, imgSrc: '/img/account/avatar5.jpg', publishTime: '2020-03-28 12:20', collection: 203, star: 9, word: 24,
      }, {
        index: 1, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', publishTime: '2020-02-25 13:13', collection: 129, star: 105, word: 76,
      }, {
        index: 2, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', publishTime: '2020-03-13 07:02', collection: 136, star: 1, word: 93,
      }, {
        index: 3, imgSrc: '/img/account/kZzEzemZyKLKFsojXItE.png', publishTime: '2020-02-11 06:03', collection: 227, star: 186, word: 55,
      }, {
        index: 4, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', publishTime: '2020-12-21 22:42', collection: 235, star: 15, word: 75,
      }, {
        index: 5, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', publishTime: '2020-05-18 17:46', collection: 89, star: 124, word: 66,
      }, {
        index: 6, imgSrc: '/img/account/zOsKZmFRdUtvpqCImOVY.png', publishTime: '2020-11-24 09:40', collection: 285, star: 73, word: 85,
      }, {
        index: 7, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', publishTime: '2020-08-20 12:03', collection: 226, star: 145, word: 38,
      }, {
        index: 8, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', publishTime: '2020-10-16 07:39', collection: 185, star: 42, word: 77,
      }, {
        index: 9, imgSrc: '/img/account/siCrBXXhmvTQGWPNLBow.png', publishTime: '2020-01-03 00:38', collection: 60, star: 38, word: 80,
      }, {
        index: 10, imgSrc: '/img/account/zOsKZmFRdUtvpqCImOVY.png', publishTime: '2020-01-04 09:20', collection: 234, star: 14, word: 21,
      }, {
        index: 11, imgSrc: '/img/account/zOsKZmFRdUtvpqCImOVY.png', publishTime: '2020-01-26 05:26', collection: 4, star: 103, word: 17,
      }, {
        index: 12, imgSrc: '/img/account/avatar5.jpg', publishTime: '2020-05-06 17:23', collection: 96, star: 34, word: 12,
      }, {
        index: 13, imgSrc: '/img/account/siCrBXXhmvTQGWPNLBow.png', publishTime: '2020-08-21 15:10', collection: 215, star: 79, word: 62,
      }, {
        index: 14, imgSrc: '/img/account/kZzEzemZyKLKFsojXItE.png', publishTime: '2020-01-17 11:36', collection: 70, star: 107, word: 8,
      }, {
        index: 15, imgSrc: '/img/account/siCrBXXhmvTQGWPNLBow.png', publishTime: '2020-11-03 07:04', collection: 34, star: 168, word: 80,
      }, {
        index: 16, imgSrc: '/img/account/kZzEzemZyKLKFsojXItE.png', publishTime: '2020-08-28 11:12', collection: 192, star: 143, word: 12,
      }, {
        index: 17, imgSrc: '/img/account/avatar5.jpg', publishTime: '2020-08-31 09:18', collection: 174, star: 101, word: 30,
      }, {
        index: 18, imgSrc: '/img/account/sfjbOqnsXXJgNCjCzDBL.png', publishTime: '2020-06-02 00:52', collection: 53, star: 7, word: 17,
      }, {
        index: 19, imgSrc: '/img/account/avatar5.jpg', publishTime: '2020-08-14 22:02', collection: 18, star: 36, word: 62,
      }, {
        index: 20, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', publishTime: '2020-08-01 05:09', collection: 34, star: 109, word: 72,
      }, {
        index: 21, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', publishTime: '2020-11-16 14:37', collection: 6, star: 115, word: 20,
      }, {
        index: 22, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', publishTime: '2020-06-16 11:34', collection: 58, star: 133, word: 55,
      }, {
        index: 23, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', publishTime: '2020-05-05 11:42', collection: 172, star: 88, word: 61,
      }, {
        index: 24, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', publishTime: '2020-11-24 10:18', collection: 246, star: 92, word: 80,
      }, {
        index: 25, imgSrc: '/img/account/siCrBXXhmvTQGWPNLBow.png', publishTime: '2020-07-12 12:07', collection: 236, star: 28, word: 74,
      }, {
        index: 26, imgSrc: '/img/account/zOsKZmFRdUtvpqCImOVY.png', publishTime: '2020-12-01 19:19', collection: 230, star: 0, word: 35,
      }, {
        index: 27, imgSrc: '/img/account/avatar5.jpg', publishTime: '2020-10-02 13:45', collection: 223, star: 41, word: 34,
      }, {
        index: 28, imgSrc: '/img/account/sfjbOqnsXXJgNCjCzDBL.png', publishTime: '2020-10-10 02:39', collection: 144, star: 71, word: 75,
      }, {
        index: 29, imgSrc: '/img/account/kZzEzemZyKLKFsojXItE.png', publishTime: '2020-07-23 02:56', collection: 255, star: 115, word: 74,
      }, {
        index: 30, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', publishTime: '2020-03-03 18:02', collection: 198, star: 94, word: 11,
      }, {
        index: 31, imgSrc: '/img/account/avatar5.jpg', publishTime: '2020-04-04 15:59', collection: 132, star: 173, word: 9,
      }, {
        index: 32, imgSrc: '/img/account/sfjbOqnsXXJgNCjCzDBL.png', publishTime: '2020-05-26 18:10', collection: 191, star: 16, word: 27,
      }, {
        index: 33, imgSrc: '/img/account/siCrBXXhmvTQGWPNLBow.png', publishTime: '2020-04-22 05:58', collection: 294, star: 144, word: 76,
      }, {
        index: 34, imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', publishTime: '2020-01-27 15:15', collection: 190, star: 183, word: 40,
      }, {
        index: 35, imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', publishTime: '2020-05-21 13:22', collection: 159, star: 159, word: 1,
      }],
      projectDatas: [{ pictureSrc: '/img/account/time1.jpg', index: 0, hour: 12 }, { pictureSrc: '/img/account/time16.jpg', index: 1, hour: 10 }, { pictureSrc: '/img/account/time3.jpg', index: 2, hour: 7 }, { pictureSrc: '/img/account/time2.jpg', index: 3, hour: 13 }, { pictureSrc: '/img/account/time17.jpg', index: 4, hour: 4 }, { pictureSrc: '/img/account/time4.jpg', index: 5, hour: 19 }, { pictureSrc: '/img/account/time18.jpg', index: 6, hour: 10 }, { pictureSrc: '/img/account/time5.jpg', index: 7, hour: 10 }, { pictureSrc: '/img/account/time6.jpg', index: 8, hour: 12 }, { pictureSrc: '/img/account/time15.jpg', index: 9, hour: 17 }, { pictureSrc: '/img/account/time14.jpg', index: 10, hour: 17 }, { pictureSrc: '/img/account/time7.jpg', index: 11, hour: 4 }, { pictureSrc: '/img/account/time8.jpg', index: 12, hour: 13 }, { pictureSrc: '/img/account/time9.jpg', index: 13, hour: 9 }, { pictureSrc: '/img/account/time10.jpg', index: 14, hour: 13 }, { pictureSrc: '/img/account/time11.jpg', index: 15, hour: 10 }, { pictureSrc: '/img/account/time19.jpg', index: 16, hour: 10 }, { pictureSrc: '/img/account/time12.jpg', index: 17, hour: 9 }, { pictureSrc: '/img/account/time13.jpg', index: 18, hour: 7 }],
      groupDatas: [{ imgSrc: '/img/account/WdGqmHpayyMjiEhcKoVE.png', label: '科学搬砖组' }, { imgSrc: '/img/account/avatar5.jpg', label: '全组都是吴彦祖' }, { imgSrc: '/img/account/zOsKZmFRdUtvpqCImOVY.png', label: '中二少女团' }, { imgSrc: '/img/account/dURIMkkrRFpPgTuzkwnB.png', label: '程序员日常' }, { imgSrc: '/img/account/sfjbOqnsXXJgNCjCzDBL.png', label: '高逼格设计天团' }, { imgSrc: '/img/account/siCrBXXhmvTQGWPNLBow.png', label: '骗你来学计算机' }, { imgSrc: '/img/account/kZzEzemZyKLKFsojXItE.png', label: '打死不学JS' }],
      introduceData: {
        imgSrc: '/img/user/woman.jpg',
        name: 'Serati Ma',
        motto: '海纳百川，有容乃大',
        job: '交互专家',
        department: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        address: '浙江省杭州市',
      },
      labelDatas: [
        {
          selected: true,
          removable: true,
          show: true,
          color: 'primary',
          textColor: 'white',
          icon: 'event',
          label: '很有想法的',
          class: 'glossy',
          square: true,
        },
        {
          selected: true,
          removable: true,
          show: true,
          color: 'teal',
          textColor: 'white',
          icon: 'bookmark',
          label: '专注设计',
          square: false,
        },
        {
          selected: true,
          removable: true,
          show: true,
          color: 'orange',
          textColor: 'white',
          icon: 'star',
          label: '辣~',
          square: true,
        },
        {
          selected: true,
          removable: true,
          show: true,
          color: 'deep-orange',
          textColor: 'white',
          icon: 'directions',
          label: '大长腿',
          class: 'glossy',
          square: false,
        },
        {
          selected: false,
          removable: true,
          show: true,
          color: 'red',
          textColor: 'white',
          icon: 'language',
          outline: true,
          class: 'bg-red-1',
          label: '川妹子',
          square: true,
        },
        {
          selected: false,
          removable: true,
          show: true,
          color: 'info',
          textColor: 'white',
          icon: 'backup',
          label: '海纳百川',
          square: false,
        },
        {
          selected: true,
          removable: true,
          show: true,
          color: 'green',
          textColor: 'white',
          icon: 'explore',
          label: '完美主义者',
          square: true,
        },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="stylus">
.account-avatar
  width 28px
  height 28px
</style>
