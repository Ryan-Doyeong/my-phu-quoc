-- v7.4 five-category directory and editorial emphasis badges.
alter table public.businesses add column if not exists badges text[] not null default '{}'::text[];
create index if not exists businesses_category_subcategory_idx on public.businesses(category, subcategory);

update public.businesses
set category='cafe',
    subcategory=case
      when lower(coalesce(subcategory,''))='brunch' then 'Brunch Cafe'
      when lower(coalesce(subcategory,''))='bakery' then 'Bakery Cafe'
      when lower(array_to_string(tags,' ')) like '%pet cafe%' or lower(public_name) like '%pet cafe%' then 'Pet Cafe'
      when lower(array_to_string(tags,' ')) like '%specialty%' or lower(public_name) like '%specialty coffee%' then 'Specialty Coffee'
      when lower(array_to_string(tags,' ')) like '%dessert%' then 'Dessert Cafe'
      else 'Cafe'
    end,
    updated_at=now()
where category='food' and subcategory in ('Cafe','Brunch','Bakery');

update public.businesses
set category='workout',
    subcategory=case
      when lower(array_to_string(tags,' ')) like '%boxing fitness%' then 'Boxing Fitness'
      when subcategory='Gym' then 'Public Gym'
      else subcategory
    end,
    updated_at=now()
where category='wellness' and subcategory in ('Gym','CrossFit','Circuit Training','Functional Training','Yoga','Pilates');

update public.businesses
set subcategory=case
      when subcategory='Beauty' then 'Beauty & Skin'
      when subcategory='Recovery' and (lower(array_to_string(tags,' ')) like '%sauna%' or lower(public_name) like '%sauna%' or lower(public_name) like '%ice bath%') then 'Sauna & Ice Bath'
      when subcategory='Recovery' and lower(array_to_string(tags,' ')) like '%therapy%' then 'Therapy'
      else subcategory
    end,
    updated_at=now()
where category='wellness';

update public.businesses
set subcategory=case
      when lower(array_to_string(tags,' ')) like '%korean%' then 'Korean'
      when lower(array_to_string(tags,' ')) like '%japanese%' or lower(array_to_string(tags,' ')) like '%sushi%' then 'Japanese'
      when lower(array_to_string(tags,' ')) like '%chinese%' then 'Chinese'
      when lower(array_to_string(tags,' ')) like '%vietnamese%' then 'Vietnamese'
      when lower(array_to_string(tags,' ')) like '%thai%' then 'Thai'
      when lower(array_to_string(tags,' ')) like '%italian%' then 'Italian'
      when lower(array_to_string(tags,' ')) like '%indian%' then 'Indian'
      when lower(array_to_string(tags,' ')) like '%vegetarian%' then 'Vegetarian'
      when lower(array_to_string(tags,' ')) like '%salad%' then 'Salad Bar'
      when lower(array_to_string(tags,' ')) like '%healthy%' then 'Healthy Restaurant'
      when lower(array_to_string(tags,' ')) like '%grill%' then 'Grill'
      when lower(array_to_string(tags,' ')) like '%pizza%' then 'Pizza'
      when lower(array_to_string(tags,' ')) like '%asian%' then 'Asian'
      when subcategory='Healthy Food' then 'Healthy Restaurant'
      else 'Restaurant'
    end,
    updated_at=now()
where category='food';
