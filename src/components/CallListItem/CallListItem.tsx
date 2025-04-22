// import React from 'react';
// import Avatar from '../../shared/ui-kit/Avatar/Avatar';
// import CallStatusBadge from '../../shared/ui-kit/CallStatusBadge/CallStatusBadge';
// import { getCallQuality } from '../../utils/getCallQuality';
// import formatPhoneNumber from '../../utils/formatPhoneNumber';
// import CallStatusIcon from '../../shared/ui-kit/CallTypeIcon/CallStatusIcon';
// import AudioPlayer from '../../shared/ui-kit/AudioPlayer/AudioPlayer';
// import getTime from '../../utils/getTime';
// import { Call } from '../../types/ICall';
// import s from './CallListItem.module.scss';
// type CallListItemProps = {
//     call: Call;
// };
// export const CallListItem = ({ call }: CallListItemProps) => {
//     const isIncoming = call.in_out === 1;

//     const quality = getCallQuality(call);

//     return (
//         <div key={call.id} className={s.rowWrapper}>
//             <CallStatusIcon
//                 style={{ marginRight: '32px' }}
//                 status={call.status}
//                 in_out={call.in_out}
//             />
//             <span style={{ marginRight: '48px' }} className={s.time}>
//                 {getTime(call.date)}
//             </span>

//             <Avatar
//                 personSurname={call.person_surname}
//                 personName={call.person_name}
//                 personAvatar={call.person_avatar}
//                 style={{ marginRight: '96px' }}
//             />
//             <span>
//                 {call.partner_data.name ||
//                     formatPhoneNumber(call.partner_data.phone)}
//             </span>
//             <span className={s.source}>{call.source || ''}</span>
//             <CallStatusBadge type={quality} />
//             <AudioPlayer src={call.record} duration={call.time} />
//         </div>
//     );
// };
