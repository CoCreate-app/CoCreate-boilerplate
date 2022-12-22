//Read list Implementation
import filter from '@cocreate/filter'
import crud from '@cocreate/crud-client';
import render from '@cocreate/render';

const {fetch_collection, is_collection_fetch, fetch_count} = crud.getFetchAttr(el) //namespace, room, broadcast, broadcat_sender, 


const filter = CoCreateFilter.init(
	el, 
	attribute, /* default value = template_id*/ 
	type, /* default value = template*/
)

/** filter object structure */
filter = {
	attribute,
	id, 			/* element id */
	el, 			/* element */
	type,			/* type in input parameter */
	collection, 	/* fetch-collection */
	startIndex, 	/* init value = 0 */
	search: {
		type: 'or',	/* or */
		value:[],	/* Array:filter-value without filter-name */
	}, 
	sort: [{
		name,		/* order-by */
		type,		/* order-type == 'asc' ? 1 : -1 */
	}],			
	query: [{
		name,		/* filter-name */
		value:[],	/* filter-value by filter-value_type(string|raw|number) : Array */
		operator,	/* filter-operator */
		type		/* filter-type */
	}],
	limit,			/* fetch-limit */
}

crud.readDocument(filter);
