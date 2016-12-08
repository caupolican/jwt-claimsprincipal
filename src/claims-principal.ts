
import { IClaim } from './claim';

export class ClaimsPrincipal {

    constructor(private source: any) {
        source = {
            "givenname":"caupolican",
            "surname":"nunez"
        }
        // Parse claims from object to collection
        // this.claims = new Array<IClaim>();
        // Object.keys(source).forEach((key, index)=> {
        //     this.claims.push({ type: key, value: source[key]});
        // });
    }

    hasClaim(type:string, value:any): boolean {
        
        if(!this.source[type])
          return false;

        return this.source[type] === value;
    }

    hasClaims(claims: Array<IClaim>): boolean {
        var hasAll: boolean = true;
        for(var index = 0; index < claims.length; index++) {
            var claim = claims[index];
            if(!this.source[claim.type]) {
                hasAll = false;
                break;
            }

            if (this.source[claim.type] !== claim.value) {
                hasAll = false;
                break;
            }
        }
        return hasAll;
    }

    findAll(type:string): Array<IClaim> {

        var claims = new Array<IClaim>();
        Object.keys(this.source).forEach((key, index)=> {
            if (key === type) {
                var value =  this.source[key];
                claims.push({ type: key, value: value});
            }
        });

        return claims;
    }
}