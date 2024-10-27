import { FC } from 'react';

import s from './TaskItem.module.scss';

const TaskItem: FC = () => {
  return (
    <article className={s.taskItem}>
      <div className={s.content}>
        <div className={s.left}>
          <div className={s.id}>323</div>
          <div className={s.number}>321321321</div>
          <div className={s.area}>Самара</div>
        </div>
        <div className={s.right}>
          <div className={s.name}>ЫВФЫВывфвфвфы</div>
          <div className={s.name}>Подзадача</div>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.left}>
          <div>Приоритет: средний</div>
          <div>Статус: выполнено</div>
        </div>
        <div className={s.right}>
          <div className={s.person}>Дмитрий В.</div>
          <div className={s.date}>2023-02-21 13:00</div>
        </div>
      </div>
    </article>
  );
};

export { TaskItem };
