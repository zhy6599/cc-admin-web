export default {
  top(h, conf) {
    // h, conf, key
    // const btns = conf.slot[key];
    const addBtn = <div class="row no-wrap full-width">
            <div class="col-2 q-table__title">{conf.title}</div>
            <q-space />
            <q-btn-group dense outline>
              <q-btn outline no-wrap icon="add" color="primary" label="新建" />
            </q-btn-group>
          </div>;
    return <template slot="top"><q-space/>{addBtn}</template>;
  },
  bodyCellOpt(h, conf) {
    const optBtns = <q-td auto-width={true}>
      <q-btn flat round dense color="primary" icon="edit" >
        <q-tooltip>编辑{conf.title}</q-tooltip>
      </q-btn>
      <q-btn flat round dense color="negative" icon="delete" >
        <q-tooltip>删除{conf.title}</q-tooltip>
      </q-btn>
    </q-td>;
    return <template slot="body-cell-opt">{optBtns}</template>;
  },

};
