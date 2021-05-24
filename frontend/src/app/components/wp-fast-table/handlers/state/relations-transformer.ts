import { Injector } from '@angular/core';
import { WorkPackageTable } from '../../wp-fast-table';
import { IsolatedQuerySpace } from "core-app/features/work_packages/directives/query-space/isolated-query-space";
import { takeUntil } from "rxjs/operators";
import { WorkPackageViewRelationColumnsService } from "core-app/features/work_packages/routing/wp-view-base/view-services/wp-view-relation-columns.service";
import { InjectField } from "core-app/shared/helpers/angular/inject-field.decorator";

export class RelationsTransformer {

  @InjectField() public wpTableRelationColumns:WorkPackageViewRelationColumnsService;
  @InjectField() public querySpace:IsolatedQuerySpace;

  constructor(public readonly injector:Injector,
    table:WorkPackageTable) {

    this.wpTableRelationColumns
      .updates$()
      .pipe(
        takeUntil(this.querySpace.stopAllSubscriptions)
      )
      .subscribe(() => {
        table.redrawTableAndTimeline();
      });
  }
}
