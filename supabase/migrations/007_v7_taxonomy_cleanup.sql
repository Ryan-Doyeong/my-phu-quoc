-- v7 taxonomy cleanup: normalize one remaining food subtype and de-duplicate searchable tags.
update public.businesses
set tags=array_cat(tags,array['Dessert'])
where category='food' and subcategory='Cafe & Dessert' and not ('Dessert'=any(tags));

update public.businesses
set subcategory='Cafe'
where category='food' and subcategory='Cafe & Dessert';

update public.businesses b
set tags=(select coalesce(array_agg(distinct x order by x),'{}'::text[]) from unnest(b.tags) as x)
where coalesce(array_length(tags,1),0)>0;
