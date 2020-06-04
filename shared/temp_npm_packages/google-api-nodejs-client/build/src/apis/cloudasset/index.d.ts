/*! THIS FILE IS AUTO-GENERATED */
import { AuthPlus } from 'googleapis-common';
import { cloudasset_v1 } from './v1';
import { cloudasset_v1beta1 } from './v1beta1';
import { cloudasset_v1p1beta1 } from './v1p1beta1';
import { cloudasset_v1p4beta1 } from './v1p4beta1';
export declare const VERSIONS: {
    v1: typeof cloudasset_v1.Cloudasset;
    v1beta1: typeof cloudasset_v1beta1.Cloudasset;
    v1p1beta1: typeof cloudasset_v1p1beta1.Cloudasset;
    v1p4beta1: typeof cloudasset_v1p4beta1.Cloudasset;
};
export declare function cloudasset(version: 'v1'): cloudasset_v1.Cloudasset;
export declare function cloudasset(options: cloudasset_v1.Options): cloudasset_v1.Cloudasset;
export declare function cloudasset(version: 'v1beta1'): cloudasset_v1beta1.Cloudasset;
export declare function cloudasset(options: cloudasset_v1beta1.Options): cloudasset_v1beta1.Cloudasset;
export declare function cloudasset(version: 'v1p1beta1'): cloudasset_v1p1beta1.Cloudasset;
export declare function cloudasset(options: cloudasset_v1p1beta1.Options): cloudasset_v1p1beta1.Cloudasset;
export declare function cloudasset(version: 'v1p4beta1'): cloudasset_v1p4beta1.Cloudasset;
export declare function cloudasset(options: cloudasset_v1p4beta1.Options): cloudasset_v1p4beta1.Cloudasset;
declare const auth: AuthPlus;
export { auth };
