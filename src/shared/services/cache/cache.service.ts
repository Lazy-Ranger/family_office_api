import NodeCache from 'node-cache';
import { valueToBoolean } from '../../../utils/common';


export default class CacheService {
  private static instance: NodeCache;

  constructor() {
    if (!valueToBoolean(CacheService.instance)) {
      CacheService.instance = new NodeCache();
    }
  }

  getInstance(): NodeCache {
    return CacheService.instance;
  }
}
