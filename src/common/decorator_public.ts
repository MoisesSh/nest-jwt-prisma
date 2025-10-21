import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'XFnC81SI66Aw3gCsMwwUYdbLuAAHXmDh';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
