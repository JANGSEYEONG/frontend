import { parse, isSameDay, format } from 'date-fns';

// 숫자에 3자리씩 ',' 찍어주는 함수
export const addCommasToNumber = (number: number): string => {
  if (number == undefined || number == null) return '0';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 필요 시 다른 타입 추가나 년/월/일 | 월/일 자름 타입 추가 필요
export const formatYMD = (date: Date, type: string = 'period') => {
  if (type === 'period') return format(date, format(date, 'yyyy.MM.dd'));
  if (type === 'word') return format(date, 'yyyy년 MM월 dd일');
};

// 필요 시 다른 타입 추가나 년/월/일 | 월/일 자름 타입 추가 필요
export const formatYM = (date: Date, type: string = 'period') => {
  if (type === 'period') return format(date, format(date, 'yyyy.MM'));
  if (type === 'word') return format(date, 'yyyy년 MM월');
};

// 서버에 보낼 때 날짜 형식 정의 `yyyy-MM-ddThh:mm:ss`
export const formatToServer = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

// 'yyyyMMdd' 형태의 문자열과 Date 객체를 비교하여 같은 년/월/일인지 돌려주는 함수
export const compareYMDString = (dateString: string, date: Date, format: string = 'yyyyMMdd') => {
  // 문자열 날짜를 Date 객체로 변환
  const dateFromString = parse(dateString, format, new Date());

  // 비교할 Date 객체
  const areSameDay = isSameDay(dateFromString, date);

  return areSameDay;
};
