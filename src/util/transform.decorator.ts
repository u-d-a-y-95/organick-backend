import { Transform } from 'class-transformer';

export const Trim = () => {
  return Transform((data) => {
    if (typeof data.value === 'string') return data.value.trim();
    return data;
  });
};
